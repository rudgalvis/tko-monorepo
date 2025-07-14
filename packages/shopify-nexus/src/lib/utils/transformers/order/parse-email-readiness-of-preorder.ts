import type { OrderLineInventoryAnalyzed } from '$lib/types/OrderLineInventoryAnalyzed'

export type PreorderEmailAnalyzed = {
	productTitle: string
	ready: boolean
	errorMessage?: string
	estimatedShippingDate?: string
}

export const parseEmailReadinessOfPreorder = (
	orderLineInventoriesAnalyzed: OrderLineInventoryAnalyzed[]
): PreorderEmailAnalyzed[] => {
	const preorderItems = orderLineInventoriesAnalyzed.filter((item) => item.preOrders > 0)

	const uniquePreorderProducts = [...new Set(preorderItems.map(({ title }) => title))]

	return uniquePreorderProducts
		.map((productTitle) => {
			const item = preorderItems.find(({ title }) => title === productTitle)

			if (!item) return {
				productTitle: productTitle,
				ready: false,
				errorMessage: 'Item not found in analyzed webhook data',
			}

			if (!item.expectedDate.value) {
				return {
					productTitle: productTitle,
					ready: false,
					errorMessage: 'Expected date is not set',
				}
			}

			return {
				productTitle,
				ready: true,
				estimatedShippingDate: item.expectedDate.value,
			}
		})
}
