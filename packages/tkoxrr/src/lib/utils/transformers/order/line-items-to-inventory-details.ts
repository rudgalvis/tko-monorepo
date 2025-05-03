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

	const quantities = orderLineItem.map(({ quantity, variant_id }) => ({
		id: gidGenerator(ObjectsGIDS.PRODUCT_VARIANT, variant_id),
		orderedQuantity: quantity,
	}))

	const inventoryDetails = mergeObjects(productVariants, quantities, 'id') as OrderLineInventory[]

	return inventoryDetails.map((e) => ({
		...e,
		inventoryQuantity: e.inventoryQuantity + e.orderedQuantity,
	}))
}
