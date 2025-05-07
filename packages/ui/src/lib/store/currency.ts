import { NexusApi } from 'storefront-api';
import { writable } from 'svelte/store';

const nexusApi = new NexusApi();

// Check for browser environment before accessing localStorage
const isBrowser = typeof window !== 'undefined';

// Create a function to handle persistent stores
function persistentWritable<T>(key: string, initialValue: T) {
	// Get stored value if in browser, otherwise use initial value
	const storedValue = isBrowser ? localStorage.getItem(key) : null;
	const store = writable<T>(storedValue ? JSON.parse(storedValue) : initialValue);

	// If in browser, subscribe to changes and update localStorage
	if (isBrowser) {
		store.subscribe((value) => {
			localStorage.setItem(key, JSON.stringify(value));
		});
	}

	return store;
}


export const displayCurrency = persistentWritable<string>('displayCurrency', 'EUR');
export const marketCurrency = writable<string>('EUR');
export const currencyRates = writable<Record<string, number> | null>(null);

marketCurrency.subscribe(async (v) =>
	currencyRates.set(await nexusApi.getCurrencyRates(v))
);

//currencyRates.subscribe((rates) => {
//	console.log({ rates });
//});

// TODO: make persistant
