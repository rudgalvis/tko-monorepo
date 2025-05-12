import { persistentWritable } from 'common-utils';
import { NexusApi } from 'storefront-api';
import { writable } from 'svelte/store';
import availableCurrencies from '$lib/data/available-currencies.json' with { type: 'json' };

const nexusApi = new NexusApi();

export const displayCurrency = persistentWritable<string | null>('displayCurrency', null);
export const marketCurrency = persistentWritable<string | null>('marketCurrency', null);
export const currencyRates = writable<Record<string, number> | null>(null);

const whitelistedCurrencies = availableCurrencies.map(e => e.currency);
const defaultCurrency = 'EUR'

displayCurrency.subscribe((v) => {
	if(!v) return

	if(!whitelistedCurrencies.includes(v)) {
		return displayCurrency.set(defaultCurrency)
	}
})

marketCurrency.subscribe(async (v) => {
	if(!v) return

	if(!whitelistedCurrencies.includes(v)) {
		return marketCurrency.set(defaultCurrency)
	}

	currencyRates.set(await nexusApi.getCurrencyRates(v));
});
