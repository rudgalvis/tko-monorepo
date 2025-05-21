import type { Writable } from 'svelte/store';

export interface ExposedStores {
	displayCurrency: Writable<string>;
	marketCurrency: Writable<string>;
}
export interface ExposedActions {
}
