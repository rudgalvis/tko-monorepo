/**
 * Helper functions for Localization
 *
 * Manages localization cookie refresh based on:
 * 1. First visit: Keep Shopify's correct cookie (based on IP)
 * 2. Same session: Keep existing cookie (session storage tracks this)
 * 3. Revisit <24h: Keep existing cookie (localStorage timestamp tracks this)
 * 4. Revisit >24h: Clear cookie, force Shopify IP recalculation
 */

import { frontendLogger } from "../../loggers/frontend-logger.js";
import { isBrowser } from "../../predicates/is-browser.js";
import { getCookie } from "../storage/get-cookie.js";
import { setSession } from "../storage/get-session.js";
import {
	LOCALIZATION_STORAGE_KEYS,
	markAsVisited,
	updateLastLocalizationCheck
} from "./localization-storage.js";
import { displayCurrency, localization, marketCurrency } from "$lib/store/currency.js";
import { detectUserCountry, normalizeCountryCode } from "./geolocation-detector.js";

const LOCALIZATION_COOKIE_NAME = 'localization';
const JUST_REFRESHED_FLAG = 'localization_just_refreshed';

/**
 * Marks the current session as initialized to prevent redundant checks
 */
export const initializeSession = (): void => {
	setSession(LOCALIZATION_STORAGE_KEYS.SESSION_INITIALIZED, true);
};

/**
 * Checks if we just completed a page refresh after clearing the localization cookie
 */
export const wasJustRefreshed = (): boolean => {
	if (!isBrowser()) return false;
	return localStorage.getItem(JUST_REFRESHED_FLAG) === 'true';
};

/**
 * Handles post-refresh initialization
 */
export const handlePostRefresh = (): void => {
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
export const handleFirstVisit = (): void => {
	markAsVisited();
	initializeSession();
	frontendLogger.debug('Localization: First visit, keeping default Shopify cookie');
};

/**
 * Triggers a localization refresh by detecting user's actual country and redirecting
 */
export const triggerLocalizationRefresh = async (): Promise<void> => {
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
//			window.location.href = url.toString();
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
export const handleReturningVisitorNoRefresh = (): void => {
	updateLastLocalizationCheck();
	initializeSession();
	frontendLogger.debug('Localization: Recent check, keeping existing cookie');
};

