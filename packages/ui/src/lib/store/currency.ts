import { NexusApi } from 'storefront-api';
import { writable } from 'svelte/store';

const nexusApi = new NexusApi();

export const displayCurrency = writable<string>('EUR');
export const marketCurrency = writable<string>('EUR');
export const currencyRates = writable<Record<string, number> | null>(null);

marketCurrency.subscribe(async (v) =>
	currencyRates.set(await nexusApi.getCurrencyRates(v))
);

//currencyRates.subscribe((rates) => {
//	console.log({ rates });
//});

// TODO: make persistant
