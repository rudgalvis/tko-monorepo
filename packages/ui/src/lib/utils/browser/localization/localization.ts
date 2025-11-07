/**
 * Localization Manager
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

import { isBrowser } from "../../predicates/is-browser.js";
import { cookieExists } from "../storage/get-cookie.js";
import { getSession } from "../storage/get-session.js";
import {
	LOCALIZATION_STORAGE_KEYS,
	hasVisitedBefore,
	needsLocalizationRefresh
} from "./localization-storage.js";
import {
	wasJustRefreshed,
	handlePostRefresh,
	handleFirstVisit,
	triggerLocalizationRefresh,
	handleReturningVisitorNoRefresh
} from "./localization-helpers.js";
import { frontendLogger } from "../../loggers/frontend-logger.js";

const LOCALIZATION_COOKIE_NAME = 'localization';

/**
 * Enforces the user to their correct market based on geolocation
 *
 * This function:
 * 1. Detects the user's actual country based on their IP address
 * 2. Compares it with their current market (localization cookie)
 * 3. Redirects them to the correct market if they're in the wrong one
 * 4. Tracks visit history to avoid unnecessary redirects within 24 hours
 *
 * This ensures users always see content, pricing, and shipping options
 * relevant to their actual location while respecting their session preferences.
 */
export const geolocationMarketEnforcer = async (): Promise<void> => {
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

