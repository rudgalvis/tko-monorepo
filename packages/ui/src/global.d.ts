// src/global.d.ts
import type { ExposedActions, ExposedStores, WindowShopify } from '$lib/store/types.js';

declare global {
	interface Window {
		Shopify: WindowShopify;
		UI: {
			stores: ExposedStores;
			actions: ExposedActions;
		};
		CartJS?: {
			addItem: (id: string, quantity: number) => void;
			// Add other methods and properties of CartJS as needed
		};
		getAutomaticDiscount: (isoCode: string, variantId: number) => Promise<any>
	}
}

export {};
