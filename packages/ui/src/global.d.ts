// src/global.d.ts
import type { Cart } from '$lib/api/storefront-api.types.js';
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
			cart: object
			// Add other methods and properties of CartJS as needed
		};
		getAutomaticDiscount: (isoCode: string, variantId: number) => Promise<any>
	}
}

export {};
