import type { OrderLineInventoryAnalyzed } from '$lib/types/OrderLineInventoryAnalyzed'
import type { DescriptiveVariantIdentifier } from '$lib/utils/transformers/order/parse-order-webhook'

export const extractPreOrdersItems = (
    orderLineInventoriesAnalyzed: OrderLineInventoryAnalyzed[]
): OrderLineInventoryAnalyzed[] => {
    return orderLineInventoriesAnalyzed.filter((item) => item.preOrders > 0)
}

export const getUniqueProductTitles = (preorderItems: OrderLineInventoryAnalyzed[]) => {
    return [...new Set(preorderItems.map(({ title }) => title))]
}

export const getUniqueVariants = (
    preorderItems: OrderLineInventoryAnalyzed[]
): DescriptiveVariantIdentifier[] => {
    const uniqueTitles = getUniqueProductTitles(preorderItems)

    return uniqueTitles.map((title) => {
        // Find the first item with this title to get the variant and product IDs
        const item = preorderItems.find((preorderItem) => preorderItem.title === title)!
        return {
            title,
            productId: item.product.id,
            variantId: item.id,
        }
    })
}
