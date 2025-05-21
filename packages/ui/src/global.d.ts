// src/global.d.ts
import type { ExposedActions, ExposedStores } from '$lib/store/types.js';

declare global {
	interface Window {
		Shopify: unknown;
		UI: {
			stores: ExposedStores;
			actions: ExposedActions;
		};
		CartJS?: {
			addItem: (id: string, quantity: number) => void;
			// Add other methods and properties of CartJS as needed
		};
	}
}

export {};
