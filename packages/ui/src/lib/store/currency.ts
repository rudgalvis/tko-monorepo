import { persistentWritable } from 'common-utils';
import { NexusApi } from 'storefront-api';
import { writable } from 'svelte/store';

const nexusApi = new NexusApi();

export const displayCurrency = persistentWritable<string | null>('displayCurrency', null);
export const marketCurrency = persistentWritable<string | null>('marketCurrency', null);
export const currencyRates = writable<Record<string, number> | null>(null);

marketCurrency.subscribe(async (v) => {
	if(!v) return

	currencyRates.set(await nexusApi.getCurrencyRates(v));
});
