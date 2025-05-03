import { MailingService } from '$lib/mailing/MailingService'
import { OrderService } from '$lib/shopify/services/OrderService'
import { ProductService } from '$lib/shopify/services/Product.service'
import type { OrdersCreateWebhookBody } from '$lib/shopify/types/webhooks-payload/orders-create-webhook-body'
import { parseOrderWebhook } from '$lib/utils/transformers/order/parse-order-webhook'
import { json } from '@sveltejs/kit'
import fs from 'fs'
import type { RequestHandler } from './$types'

const LOG_INTO_FILE = true

const handlePreOrders = async (webhookData: OrdersCreateWebhookBody) => {
	const mailingService = new MailingService()
	const productService = new ProductService()
	const orderService = new OrderService()

	try {
		const {
			customerEmail,
			customerName,
			itemsToPausePreorder,
			orderId,
			orderLineInventories,
			orderLineInventoriesAnalyzed,
		} = await parseOrderWebhook(webhookData)

		// Disabling pre-order for items
		const disableSellingOutOfStockPromises = itemsToPausePreorder.map(
			productService.disableSellOutOfStock.bind(productService)
		)

		// Sending pre-order emails
		const preorderEmailPromises = mailingService.sendPreorderNotifications({
			orderLineInventoriesAnalyzed,
			customerName,
			customerEmail,
		})

		// Parallelizing
		const salePausePromise = Promise.all(disableSellingOutOfStockPromises)
		const preorderNotificationPromise = Promise.all(preorderEmailPromises)

		// Get responses
		const [_, preorderNotificationResponses] = await Promise.all([
			salePausePromise,
			preorderNotificationPromise,
		])

		// Generating order note for admin
		await orderService.generatePreorderNote({
			preorderNotificationResponses,
			itemsToPausePreorder,
			orderId,
			orderLineInventories,
		})

		// TODO: add logging
	} catch (e) {
		console.log('Webhook handling failed', e)
	}
}

export const POST: RequestHandler = async ({ params, request }) => {
	const webhookData = await request.json()

	// For development purposes
	if (LOG_INTO_FILE)
		fs.writeFileSync('test-data/webhook-payload/orders_create.json', JSON.stringify(webhookData))

	try {
		await handlePreOrders(webhookData)

		return json({ success: true })
	} catch (error) {
		return json({ error: 'Internal server error' }, { status: 500 })
	}
}
