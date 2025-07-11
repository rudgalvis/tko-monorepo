// src/global.d.ts
import type { ExposedActions, ExposedStores, WindowShopify } from '$lib/store/types.js';
import type { CartJSCart } from '$lib/types/CartJS.cart.js';
import type { PreorderCartItem } from 'common-utils';

declare global {
	interface Window {
		Shopify: WindowShopify;
		UI: {
			stores: ExposedStores;
			actions: ExposedActions;
		};
		CartJS?: {
			addItem: (id: string, quantity: number) => void;
			updateItem: (index: number, quantity: number) => void;
			cart: CartJSCart
			// Add other methods and properties of CartJS as needed
		};
		getAutomaticDiscount: (isoCode: string, variantId: number) => Promise<any>
		cartItemToPreorderCartItem: (v: any) => PreorderCartItem
		footerScripts: () => void
		rivets: any
	}
}

export {};
