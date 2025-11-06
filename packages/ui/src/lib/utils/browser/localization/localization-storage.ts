import { isBrowser } from '../is-browser.js';

// Storage keys
export const LOCALIZATION_STORAGE_KEYS = {
	VISITED_BEFORE: 'localization_visited_before',
	LAST_CHECKED: 'localization_last_checked',
	SESSION_INITIALIZED: 'localization_session_initialized'
};

// 24 hours in milliseconds
const DEBUG = false
export const LOCALIZATION_REFRESH_INTERVAL = DEBUG ? 5000 : 24 * 60 * 60 * 1000;

/**
 * Check if user has visited before (from localStorage)
 */
export const hasVisitedBefore = (): boolean => {
	if (!isBrowser()) return false;
	const visited = localStorage.getItem(LOCALIZATION_STORAGE_KEYS.VISITED_BEFORE);
	return visited === 'true';
};

/**
 * Mark user as having visited
 */
export const markAsVisited = (): void => {
	if (!isBrowser()) return;
	localStorage.setItem(LOCALIZATION_STORAGE_KEYS.VISITED_BEFORE, 'true');
};

/**
 * Get timestamp of last localization check
 */
export const getLastLocalizationCheck = (): number | null => {
	if (!isBrowser()) return null;
	const timestamp = localStorage.getItem(LOCALIZATION_STORAGE_KEYS.LAST_CHECKED);
	return timestamp ? parseInt(timestamp, 10) : null;
};

/**
 * Update timestamp of last localization check
 */
export const updateLastLocalizationCheck = (): void => {
	if (!isBrowser()) return;
	localStorage.setItem(LOCALIZATION_STORAGE_KEYS.LAST_CHECKED, Date.now().toString());
};

/**
 * Check if localization needs refresh (>24h since last check)
 */
export const needsLocalizationRefresh = (): boolean => {
	const lastCheck = getLastLocalizationCheck();
	
	// No previous check = needs refresh
	if (lastCheck === null) {
		return true;
	}
	
	const timeSinceLastCheck = Date.now() - lastCheck;
	return timeSinceLastCheck >= LOCALIZATION_REFRESH_INTERVAL;
};
