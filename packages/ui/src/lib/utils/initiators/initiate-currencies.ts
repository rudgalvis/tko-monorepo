import { displayCurrency, marketCurrency } from '$lib/store/currency.js';
import type { AvailableMarketsCountryCode } from '$lib/types/AvailableMarketsCountryCode.js';
import { getCookie } from '$lib/utils/browser/get-cookie.js';
import { isShopifyOnWindow } from '$lib/utils/predicates/is-shopify-on-window.js';
import { countryToCurrency } from '$lib/utils/transformers/country-to-currency.js';
import { get } from 'svelte/store';

export const initiateCurrencies = () => {
	if(!isShopifyOnWindow()) return

	// Extract market information from cookies
	const cart_currency = getCookie('cart_currency') as AvailableMarketsCountryCode

	if(cart_currency) {
		marketCurrency.set(cart_currency)
	}

	// Check if the preference was already set
	const $displayCurrency = get(displayCurrency)

	// If so, leave it as is
	if($displayCurrency) return

	// Otherwise, extract localization information from cookies
	const localization = getCookie('localization') as AvailableMarketsCountryCode

	if(localization) {
		displayCurrency.set(countryToCurrency(localization))
		return
	}

	// Or fallback to market currency
	displayCurrency.set(cart_currency);
}
