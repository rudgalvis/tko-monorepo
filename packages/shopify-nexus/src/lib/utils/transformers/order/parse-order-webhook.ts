import type { OrdersCreateWebhookBody } from '$lib/shopify/types/webhooks-payload/orders-create-webhook-body'
import { analyzeOrderLineInventories } from '$lib/utils/transformers/order/analyze-order-line-inventories'
import { orderLineItemsToOrderLineInventories } from '$lib/utils/transformers/order/line-items-to-inventories'

export type ProductVariantIdentifier = {
	productId: string
	variantId: string
}

export const parseOrderWebhook = async (webhookData: OrdersCreateWebhookBody) => {
	if (!webhookData.line_items) throw new Error('No line items found')


	const orderLineInventories = await orderLineItemsToOrderLineInventories(webhookData.line_items)
	const orderLineInventoriesAnalyzed = analyzeOrderLineInventories(orderLineInventories)

	const itemsToPausePreorder: ProductVariantIdentifier[] = orderLineInventoriesAnalyzed
		.filter(({ triggerStopPreOrders }) => !!triggerStopPreOrders)
		.map(({ product: { id: productId }, id: variantId }) => ({ productId, variantId }))

	return {
		customerEmail: webhookData.email,
		customerName: webhookData.customer?.first_name || '',
		itemsToPausePreorder,
		orderId: webhookData.id,
		orderNumber: webhookData.order_number,
		orderLineInventories,
		orderLineInventoriesAnalyzed,
	}
}
