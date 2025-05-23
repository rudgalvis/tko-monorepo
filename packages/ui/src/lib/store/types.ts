import type { Writable } from 'svelte/store';

export interface ExposedStores {
	displayCurrency: Writable<string | null>;
	marketCurrency: Writable<string | null>;
}
export type ExposedActions = object;
