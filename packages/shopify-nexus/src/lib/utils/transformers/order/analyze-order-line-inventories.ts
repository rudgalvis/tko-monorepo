import { ProductVariantInventoryPolicy } from '$lib/shopify/types/ProductVariantInventoryPolicy'
import type { OrderLineInventory } from '$lib/types/OrderLineInventory'
import type { OrderLineInventoryAnalyzed } from '$lib/types/OrderLineInventoryAnalyzed'

export const analyzeOrderLineInventories = (
	orderedItems: OrderLineInventory[]
): OrderLineInventoryAnalyzed[] => {
	return orderedItems.map((orderedItem) => {
		const {
			expectedDate,
			id,
			inventoryPolicy,
			inventoryQuantity,
			maximumPreSale: _maximumPreSale,
			orderedQuantity,
			product,
			//			title,
			name,
		} = orderedItem
		const hadSome = inventoryQuantity > 0
		let maximumPreSale = _maximumPreSale && +_maximumPreSale.value
		if (!maximumPreSale) {
			if (inventoryPolicy === ProductVariantInventoryPolicy.DENY) maximumPreSale = 0
			else maximumPreSale = 99999
		}

		let regulars = 0,
			preOrders = 0,
			cancels = 0,
			triggerStopPreOrders = false

		const newInventory = inventoryQuantity - orderedQuantity

		if (hadSome && newInventory < 0) {
			// Sell last pieces and put some on preorder
			regulars = inventoryQuantity
			preOrders = orderedQuantity - inventoryQuantity
		} else if (newInventory < 0) {
			preOrders = orderedQuantity
		} else if (newInventory >= 0) {
			regulars = orderedQuantity
		}

		// We are selling out of stock and above the limit
		if (newInventory < 0 && Math.abs(newInventory) >= maximumPreSale) {
			let allowedToPreorder = maximumPreSale

			// Some was already pre-ordered
			if (inventoryQuantity < 0) {
				allowedToPreorder = Math.max(0, maximumPreSale - Math.abs(inventoryQuantity))
			}

			cancels = preOrders - allowedToPreorder // Cancel overload
			preOrders = allowedToPreorder // Pre-order to the limit

			// We are hitting the limit here - trigger effect to stop selling out of stock
			triggerStopPreOrders = true
		}

		// Drop previous calculations, we actually are not allowed to pre-order,
		// But only if was not triggered on this calculation
		if (inventoryPolicy === ProductVariantInventoryPolicy.DENY && !triggerStopPreOrders) {
			cancels = preOrders
			preOrders = 0
		}

		// Do not disable pre-ordering if already disabled
		if (triggerStopPreOrders && inventoryPolicy === ProductVariantInventoryPolicy.DENY) {
			triggerStopPreOrders = false
		}

		// Disabling cancels because such feature is not implemented
		//		preOrders += cancels // Not moving cancels to pre-orders so that pre-order email would not be sent
		//		cancels = 0

		return {
			cancels,
			expectedDate,
			id,
			preOrders,
			product,
			regulars,
			title: name,
			triggerStopPreOrders,
		}
	})
}
