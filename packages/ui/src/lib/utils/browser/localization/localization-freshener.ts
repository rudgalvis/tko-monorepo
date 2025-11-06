/**
 * Localization Freshener
 *
 * Manages localization cookie refresh based on:
 * 1. First visit: Keep Shopify's correct cookie (based on IP)
 * 2. Same session: Keep existing cookie (session storage tracks this)
 * 3. Revisit <24h: Keep existing cookie (localStorage timestamp tracks this)
 * 4. Revisit >24h: Clear cookie, force Shopify IP recalculation
 *
 * This prevents unnecessary refreshes for new users while allowing
 * location-based cookie updates for returning users.
 */

import { frontendLogger } from "../../loggers/frontend-logger.js";
import { isBrowser } from "../is-browser.js";
import { cookieExists, getCookie } from "../storage/get-cookie.js";
import { getSession, setSession } from "../storage/get-session.js";
import {
	LOCALIZATION_STORAGE_KEYS,
	hasVisitedBefore,
	markAsVisited,
	needsLocalizationRefresh,
	updateLastLocalizationCheck
} from "./localization-storage.js";
import { displayCurrency, localization, marketCurrency } from "$lib/store/currency.js";
import { detectUserCountry, normalizeCountryCode } from "./geolocation-detector.js";

const LOCALIZATION_COOKIE_NAME = 'localization';
const JUST_REFRESHED_FLAG = 'localization_just_refreshed';


// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Marks the current session as initialized to prevent redundant checks
 */
const initializeSession = (): void => {
	setSession(LOCALIZATION_STORAGE_KEYS.SESSION_INITIALIZED, true);
};

/**
 * Checks if we just completed a page refresh after clearing the localization cookie
 */
const wasJustRefreshed = (): boolean => {
	if (!isBrowser()) return false;
	return localStorage.getItem(JUST_REFRESHED_FLAG) === 'true';
};

/**
 * Handles post-refresh initialization
 */
const handlePostRefresh = (): void => {
	if (!isBrowser()) return;
	try {
		localStorage.removeItem(JUST_REFRESHED_FLAG);
		initializeSession();
		updateLastLocalizationCheck();
		frontendLogger.debug('Localization: Freshened successfully', getCookie(LOCALIZATION_COOKIE_NAME));
	} catch (error) {
		frontendLogger.warn('Localization: Error during post-refresh initialization', error);
	}
};

/**
 * Handles first-time visitor initialization
 */
const handleFirstVisit = (): void => {
	markAsVisited();
	initializeSession();
	frontendLogger.debug('Localization: First visit, keeping default Shopify cookie');
};

/**
 * Triggers a localization refresh by detecting user's actual country and redirecting
 */
const triggerLocalizationRefresh = async (): Promise<void> => {
	if (!isBrowser()) return;
	
	frontendLogger.debug('Localization: Starting refresh process...');

	try {
		// Detect user's actual country based on IP
		const detectedCountry = await detectUserCountry();
		
		if (!detectedCountry) {
			frontendLogger.warn('Localization: Could not detect user country, skipping refresh');
			// Update timestamp anyway to avoid repeated attempts
			updateLastLocalizationCheck();
			initializeSession();
			return;
		}

		// Normalize to uppercase (Shopify will handle any unsupported countries)
		const targetCountry = normalizeCountryCode(detectedCountry);

		// Get current localization from cookie
		const currentLocalization = getCookie(LOCALIZATION_COOKIE_NAME);
		
		// Check if we need to change market
		if (currentLocalization?.toUpperCase() === targetCountry.toUpperCase()) {
			frontendLogger.debug(`Localization: Already in correct market (${targetCountry}), no redirect needed`);
			updateLastLocalizationCheck();
			initializeSession();
			return;
		}

		// User is in wrong market - redirect to correct one
		frontendLogger.debug(`Localization: Redirecting from ${currentLocalization} to ${targetCountry}`);

		// Clear stores before redirect with error handling
		try {
			displayCurrency.set(null);
			marketCurrency.set(null);
			localization.set(null);
		} catch (storeError) {
			frontendLogger.warn('Localization: Error clearing stores before redirect', storeError);
		}

		// Set flag to track that we initiated this redirect
		try {
			localStorage.setItem(JUST_REFRESHED_FLAG, 'true');
		} catch (storageError) {
			frontendLogger.warn('Localization: Error setting refresh flag', storageError);
		}

		// Redirect to same URL with country parameter
		try {
			const url = new URL(window.location.href);
			url.searchParams.set('country', targetCountry);
			window.location.href = url.toString();
		} catch (redirectError) {
			frontendLogger.warn('Localization: Error during redirect', redirectError);
		}
	} catch (error) {
		frontendLogger.warn('Localization: Unexpected error in refresh process', error);
		// Ensure we still update the check timestamp to avoid repeated attempts
		try {
			updateLastLocalizationCheck();
			initializeSession();
		} catch (fallbackError) {
			frontendLogger.warn('Localization: Error in fallback recovery', fallbackError);
		}
	}
};

/**
 * Handles returning visitor who doesn't need a refresh
 */
const handleReturningVisitorNoRefresh = (): void => {
	updateLastLocalizationCheck();
	initializeSession();
	frontendLogger.debug('Localization: Recent check, keeping existing cookie');
};

// ============================================================================
// Main Function
// ============================================================================

export const localizationFreshener = async (): Promise<void> => {
	if (!isBrowser()) return;

	try {
		// Step 1: Handle post-refresh state (must be first to prevent infinite loop)
		if (wasJustRefreshed()) {
			handlePostRefresh();
			return;
		}

		// Step 2: Skip if same session (already initialized)
		const isSessionInitialized = getSession(LOCALIZATION_STORAGE_KEYS.SESSION_INITIALIZED);
		if (isSessionInitialized) {
			frontendLogger.debug('Localization: Same session, skipping checks');
			return;
		}

		// Step 3: Handle first-time visitors
		if (!hasVisitedBefore()) {
			handleFirstVisit();
			return;
		}

		// Step 4: Handle returning visitors - check if refresh is needed
		const shouldRefresh = needsLocalizationRefresh();
		
		if (shouldRefresh && cookieExists(LOCALIZATION_COOKIE_NAME)) {
			// Trigger async refresh (will redirect if needed)
			await triggerLocalizationRefresh();
			return;
		}

		// Step 5: No refresh needed - just update tracking
		handleReturningVisitorNoRefresh();
	} catch (error) {
		frontendLogger.warn('Localization: Unexpected error in freshener', error);
	}
};

