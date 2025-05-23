import { isIosSafari } from '$lib/utils/predicates/is-ios-safari.js';
import { isShopifyOnWindow } from '$lib/utils/predicates/is-shopify-on-window.js';

// User must have this in his local storage for it not to be cleared again
const SWEEP_DATE = '2025-05-23-v2'
const SWEEP_DATE_KEY = 'storage_cleared_at'

const sweep = () => {
	// If we haven't cleared storage yet
		// Clear localStorage (except our flag)
		const keysToKeep = [SWEEP_DATE_KEY];
		Object.keys(localStorage).forEach((key) => {
			if (!keysToKeep.includes(key)) {
				localStorage.removeItem(key);
			}
		});

		// Clear sessionStorage
		sessionStorage.clear();

		// Clear cookies (except any essential ones you want to keep)
		const cookies = document.cookie.split(';');
		for (let i = 0; i < cookies.length; i++) {
			const cookie = cookies[i];
			const eqPos = cookie.indexOf('=');
			const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();

			// Skip any essential cookies you need to preserve
			// if (name === "essential_cookie") continue;

			document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
		}

		// Optionally reload to ensure a cache is refreshed
		window.location.reload();
};

const flagSweepComplete = () => {
	localStorage.setItem(SWEEP_DATE_KEY, SWEEP_DATE);
}

const isSweepRequired = () => {
	// Check if we've already cleared storage for this user
	const storageClearedAt = localStorage.getItem(SWEEP_DATE_KEY);

	if(!storageClearedAt || storageClearedAt !== SWEEP_DATE) return true

	return false
}

export const cacheSweeper = () => {
	if (!isShopifyOnWindow()) return;
	if (!isSweepRequired()) return

	if (isIosSafari()) {
		sweep();
		flagSweepComplete()
	}
};
