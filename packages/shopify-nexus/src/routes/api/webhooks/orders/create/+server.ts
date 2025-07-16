import { PUBLIC_ENV } from '$env/static/public'
import { MailingService } from '$lib/mailing/MailingService'
import { OrderService } from '$lib/shopify/services/OrderService'
import { ProductService } from '$lib/shopify/services/Product.service'
import type { OrdersCreateWebhookBody } from '$lib/shopify/types/webhooks-payload/orders-create-webhook-body'
import { writeFile } from '$lib/utils/files/write-file'
import { logger } from '$lib/utils/loggers/logger'
import { parseOrderWebhook } from '$lib/utils/transformers/order/parse-order-webhook'
import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

const LOG_INTO_FILE = true
const VERBOSE = true

// TEST_MODE: When enabled, only process orders from specific test customer emails
const TEST_MODE = false
const TEST_CUSTOMERS = [
	'rokas@rudgalvis.com',
	'rokasr788@gmail.com',
	'kriste@theknottyones.com',
	'indre.tko@gmail.com',
]

export const _handlePreOrders = async (webhookData: OrdersCreateWebhookBody) => {
	const mailingService = new MailingService()
	const productService = new ProductService()
	const orderService = new OrderService()

	try {
		const {
			customerEmail,
			customerName,
			itemsToPausePreorder,
			orderId,
			orderNumber,
			orderLineInventories,
			preorderEmailsAnalyzed,
		} = await parseOrderWebhook(webhookData)

		if (VERBOSE) logger.info(`<#${orderNumber}> Handling Order/Create webhook.`)

		if (TEST_MODE) {
			// This prevents accidental processing of real customer orders during development/testing
			if (!TEST_CUSTOMERS.includes(customerEmail)) {
				if (VERBOSE)
					logger.info(`<#${orderNumber}> Test mode enabled. ${customerEmail} is not a test customer.`)

				return
			}

			if (VERBOSE)
				logger.info(`<#${orderNumber}> Test mode enabled. Processing test customer: ${customerEmail}`)
		}

		if (VERBOSE)
			itemsToPausePreorder.forEach((e) =>
				logger.info(`<#${orderNumber}> Will pause Pre-order for ${e.variantId}`)
			)

		if (VERBOSE)
			preorderEmailsAnalyzed.forEach(({ productTitle, ready, errorMessage }) => {
				if (ready) logger.info(`<#${orderNumber}> Will send pre-order email about "${productTitle}"`)
				if (!ready)
					logger.info(
						`<#${orderNumber}> Unable to send pre-order email about "${productTitle}". Reason: ${errorMessage}`
					)
			})

		// Disabling pre-order for items
		const disableSellingOutOfStockPromises = itemsToPausePreorder.map(
			productService.disableSellOutOfStock.bind(productService)
		)

		// Sending pre-order emails
		const preorderEmailPromises = mailingService.sendPreorderNotifications({
			preorderEmailsAnalyzed,
			orderId: orderNumber.toString(),
			customerName,
			customerEmail,
		})

		// Parallelizing
		const salePausePromise = Promise.all(disableSellingOutOfStockPromises)
		const preorderNotificationPromise = Promise.all(preorderEmailPromises)

		// Get responses
		const [, preorderNotificationResponses] = await Promise.all([
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

		if (VERBOSE) logger.info(`<#${orderNumber}> Handling Complete. (order ID: #${orderNumber})`)
	} catch (e) {
		logger.info(`Webhook handling failed`, e)
	}
}

export const POST: RequestHandler = async ({ request }) => {
	const webhookData = await request.json()

	// For development purposes
	if (LOG_INTO_FILE && PUBLIC_ENV !== 'PRODUCTION')
		writeFile('test-data/webhook-payload', `orders_create.json`, webhookData)

	try {
		await _handlePreOrders(webhookData)

		return json({ success: true })
	} catch (error) {
		logger.info(error as string)
		return json({ error: 'Internal server error' }, { status: 500 })
	}
}
