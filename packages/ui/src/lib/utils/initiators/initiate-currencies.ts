import { displayCurrency, localization, marketCurrency } from '$lib/store/currency.js';
import type { AvailableMarketsCountryCode } from '$lib/types/AvailableMarketsCountryCode.js';
import { getCookie } from '$lib/utils/browser/get-cookie.js';
import { isShopifyOnWindow } from '$lib/utils/predicates/is-shopify-on-window.js';
import { countryToCurrency } from '$lib/utils/transformers/country-to-currency.js';
import { get } from 'svelte/store';

export const initiateCurrencies = () => {
	if (!isShopifyOnWindow()) return;

	// Get current stored values (our source of truth)
	const storage = {
		marketCurrency: get(marketCurrency),
		displayCurrency: get(displayCurrency),
		localization: get(localization)
	};

	// Get Shopify-controlled cookie values (can change externally)
	const cookies = {
		cart_currency: getCookie('cart_currency') as AvailableMarketsCountryCode,
		localization: getCookie('localization') as AvailableMarketsCountryCode
	};

	// Initialize from cookies if no storage exists (first-time user)
	if (cookies.cart_currency && !storage.marketCurrency) {
		marketCurrency.set(cookies.cart_currency);
		displayCurrency.set(cookies.cart_currency);
		localization.set(cookies.localization);

		return;
	}

	// Fix for users who had a different version of this code before
	if (!storage.localization) {
		localization.set(cookies.localization);
	}

	// Handle country override from URL parameter (?country=xx)
	const url = new URL(window.location.href);
	const urlParams = new URLSearchParams(window.location.search);
	const countryCode = urlParams.get('country');

	if (countryCode) {
		displayCurrency.set(countryToCurrency(countryCode as AvailableMarketsCountryCode));
		localization.set(countryCode as AvailableMarketsCountryCode);
		marketCurrency.set(countryToCurrency(countryCode as AvailableMarketsCountryCode));

		// Clean up URL parameter
		url.searchParams.delete('country');
		window.history.replaceState({}, '', url.toString());

		return;
	}

	// Restore our internal state if external changes detected
	// Happens when user changes market in checkout, causing mismatch
	if (storage.localization && cookies.localization !== storage.localization) {
		url.searchParams.set('country', storage.localization);
		window.location.href = url.toString();
	}
};
