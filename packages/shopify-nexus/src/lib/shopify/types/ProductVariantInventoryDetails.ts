import type { ProductVariantInventoryPolicy } from '$lib/shopify/types/ProductVariantInventoryPolicy'

export type ProductVariantInventoryDetails = {
	product: {
		id: string
		title: string
	}
	id: string
	title: string
	inventoryQuantity: number
	inventoryPolicy: ProductVariantInventoryPolicy
	inventoryItem: { id: string }
	expectedDate: ExpectedDate
	maximumPreSale: MaximumPreSale
}

export type ExpectedDate = {
	value: string // 2024-10-07
}

export type MaximumPreSale = {
	value: string // 20
}
