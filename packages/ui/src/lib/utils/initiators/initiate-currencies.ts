import { displayCurrency, marketCurrency } from '$lib/store/currency.js';
import type { AvailableMarketsCountryCode } from '$lib/types/AvailableMarketsCountryCode.js';
import { isShopifyOnWindow } from '$lib/utils/predicates/is-shopify-on-window.js';
import { countryToCurrency } from '$lib/utils/transformers/country-to-currency.js';
import { get } from 'svelte/store';

export const initiateCurrencies = () => {
	console.log('test')
	if(!isShopifyOnWindow()) return

	// Check for explicit country preference in the URL
	const urlParams = new URLSearchParams(window.location.search);
	const countryCode = urlParams.get('country');

	if(countryCode) {
		displayCurrency.set(countryToCurrency(countryCode as AvailableMarketsCountryCode))
		marketCurrency.set(countryToCurrency(countryCode as AvailableMarketsCountryCode))

		return
	}

	// No explicit country preference was found in the URL, check for a preference in the store
	const $displayCurrency = get(displayCurrency)
	const $marketCurrency = get(marketCurrency)

	// No preference was found for display currency, set it to the active Shopify currency
	if(!$displayCurrency) displayCurrency.set(window.Shopify.currency.active);

	// Market currency was not yet initialized, set it to the active Shopify currency
	if(!$marketCurrency) displayCurrency.set(window.Shopify.currency.active);
}
