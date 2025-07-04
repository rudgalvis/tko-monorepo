import { ProductsRepository } from '$lib/shopify/repositories/ProductsRepository'
import type { LineItem } from '$lib/shopify/types/webhooks-payload/orders-create-webhook-body'
import type { OrderLineInventory } from '$lib/types/OrderLineInventory'
import { generateVariantGid, gidGenerator, ObjectsGIDS } from '$lib/utils/generators/gid-generator'
import { mergeObjects } from '$lib/utils/mergers/merge-objects'

export const orderLineItemsToOrderLineInventories = async (
	orderLineItem: LineItem[]
): Promise<OrderLineInventory[]> => {
	const productsRepository = new ProductsRepository()

	const variantIds = orderLineItem.map(({ variant_id }) => generateVariantGid(variant_id))

	const productVariants = await productsRepository.getVariantInventories(variantIds)

	if (!productVariants) return []

	const quantities = orderLineItem.map(({ quantity, variant_id, name }) => ({
		id: gidGenerator(ObjectsGIDS.PRODUCT_VARIANT, variant_id),
		orderedQuantity: quantity,
	}))

	const name = orderLineItem.map(({ name, variant_id }) => ({
		id: gidGenerator(ObjectsGIDS.PRODUCT_VARIANT, variant_id),
		name,
	}))

	const inventoryDetails = mergeObjects(productVariants, quantities, 'id') as OrderLineInventory[]
	inventoryDetails.map((e) => ({
		...e,
		// Important: Order processing sequence
		// 1. When an order is placed, product quantities are immediately decremented
		// 2. This parsing logic runs after those quantity updates
		// 3. To accurately calculate inventory impact, we need to use
		//    the pre-order state (before quantities were decremented)
		inventoryQuantity: e.inventoryQuantity + e.orderedQuantity,
	}))

	return mergeObjects(inventoryDetails, name, 'id') as OrderLineInventory[]
}
