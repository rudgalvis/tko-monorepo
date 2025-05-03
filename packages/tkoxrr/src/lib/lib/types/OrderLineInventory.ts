import type { ProductVariantInventoryDetails } from '$lib/shopify/types/ProductVariantInventoryDetails';

export type OrderLineInventory = ProductVariantInventoryDetails & {
	orderedQuantity: number;
};
