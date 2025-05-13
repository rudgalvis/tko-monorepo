import { MailingService } from '$lib/mailing/MailingService'
import { OrderService } from '$lib/shopify/services/OrderService'
import { ProductService } from '$lib/shopify/services/Product.service'
import type { OrdersCreateWebhookBody } from '$lib/shopify/types/webhooks-payload/orders-create-webhook-body'
import { writeFile } from '$lib/utils/files/write-file'
import { parseOrderWebhook } from '$lib/utils/transformers/order/parse-order-webhook'
import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

const LOG_INTO_FILE = false
const VERBOSE = true

// TEST_MODE: When enabled, only process orders from specific test customer emails
const TEST_MODE = true
const TEST_CUSTOMERS = ['rokas@rudgalvis.com', 'rokasr788@gmail.com', 'kriste@theknottyones.com', 'indretko@gmail.com']

const handlePreOrders = async (webhookData: OrdersCreateWebhookBody) => {
	if (VERBOSE) console.log(`Handling Pre-order webhook.`)

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

		if (TEST_MODE) {
			// This prevents accidental processing of real customer orders during development/testing
			if (!TEST_CUSTOMERS.includes(customerEmail)) {
				if (VERBOSE) console.log(`Test mode enabled. ${customerEmail} is not a test customer.`)

				return
			}

			if (VERBOSE) console.log(`Test mode enabled. Processing test customer: ${customerEmail}`)
		}

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

		if (VERBOSE) console.log(`Preorder of ${customerEmail} was handled (order ID: ${orderId})`)
	} catch (e) {
		console.log('Webhook handling failed', e)
	}
}

export const POST: RequestHandler = async ({ request }) => {
	const webhookData = await request.json()

	// For development purposes
	if (LOG_INTO_FILE)
		writeFile('test-data/webhook-payload', `orders_create.json`, JSON.stringify(webhookData))

	try {
		await handlePreOrders(webhookData)

		return json({ success: true })
	} catch (error) {
		console.log(error)
		return json({ error: 'Internal server error' }, { status: 500 })
	}
}
