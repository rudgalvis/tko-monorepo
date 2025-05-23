import { persistentWritable } from 'common-utils';
import { NexusApi } from 'storefront-api';
import { writable } from 'svelte/store';
import availableCurrencies from '$lib/data/available-currencies.json' with { type: 'json' };

const nexusApi = new NexusApi();

const DISPLAY_CURRENCY_KEY = 'displayCurrency';
const MARKET_CURRENCY_KEY = 'marketCurrency';
const DEFAULT_CURRENCY = 'EUR';
const whitelistedCurrencies = availableCurrencies.map((e) => e.currency);

/* Stores */
export const displayCurrency = persistentWritable<string | null>(DISPLAY_CURRENCY_KEY, null);
export const marketCurrency = persistentWritable<string | null>(MARKET_CURRENCY_KEY, null);
export const currencyRates = writable<Record<string, number> | null>(null);

/* Actions */
export const resetDisplayCurrencyMemory = () => localStorage.removeItem(DISPLAY_CURRENCY_KEY);
export const resetMarketCurrencyMemory = () => localStorage.removeItem(MARKET_CURRENCY_KEY);

/* Effects */

displayCurrency.subscribe((v) => {
	// Fallback to default if not allowlisted
	if (!v) return;

	if (!whitelistedCurrencies.includes(v)) {
		return displayCurrency.set(DEFAULT_CURRENCY);
	}
});

marketCurrency.subscribe(async (v) => {
	// Fallback to default if not allowlisted
	if (!v) return;

	if (!whitelistedCurrencies.includes(v)) {
		return marketCurrency.set(DEFAULT_CURRENCY);
	}

	currencyRates.set(await nexusApi.getCurrencyRates(v));
});
