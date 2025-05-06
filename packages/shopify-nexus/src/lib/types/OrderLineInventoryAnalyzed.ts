import type { ExpectedDate } from '$lib/shopify/types/ProductVariantInventoryDetails'

export type OrderLineInventoryAnalyzed = {
	product: {
		id: string
		title: string
	}
	id: string
	title: string
	regulars: number
	preOrders: number
	cancels: number
	expectedDate: ExpectedDate
	triggerStopPreOrders: boolean
}
