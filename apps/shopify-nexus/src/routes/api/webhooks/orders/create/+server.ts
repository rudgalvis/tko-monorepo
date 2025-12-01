import { PUBLIC_ENV } from '$env/static/public'
import { MailingService } from '$lib/modules/mailing/MailingService'
import { OrderService } from '$lib/shopify/services/OrderService'
import type { OrdersCreateWebhookBody } from '$lib/shopify/types/webhooks-payload/orders-create-webhook-body'
import { writeFile } from '$lib/utils/files/write-file'
import { notificationGroupHandlingStrategy } from '$lib/utils/helpers/notification-group-handling-strategy'
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
    const orderService = new OrderService()

    try {
        const {
            customerEmail,
            customerName,
            itemsToPausePreorder,
            orderId,
            orderNumber,
            orderLineInventories,
            orderLineInventoriesAnalyzed,
            notificationGroups,
        } = await parseOrderWebhook(webhookData)

        if (VERBOSE) logger.info(`<#${orderNumber}> Handling Order/Create webhook.`)

        if (TEST_MODE) {
            // This prevents accidental processing of real customer orders during development/testing
            if (!TEST_CUSTOMERS.includes(customerEmail)) {
                if (VERBOSE)
                    logger.info(
                        `<#${orderNumber}> Test mode enabled. ${customerEmail} is not a test customer.`
                    )

                return
            }

            if (VERBOSE)
                logger.info(
                    `<#${orderNumber}> Test mode enabled. Processing test customer: ${customerEmail}`
                )
        }

        if (VERBOSE)
            itemsToPausePreorder.forEach((e) =>
                logger.info(`<#${orderNumber}> Will pause Pre-order for ${e.variantId}`)
            )

        // Disabling pre-order for items - done by Globo app
        // const disableSellingOutOfStockPromises = itemsToPausePreorder.map(
        //	   productService.disableSellOutOfStock.bind(productService)
        // )

        const notificationPromises = notificationGroups.map(
            notificationGroupHandlingStrategy({
                mailingService,
                orderLineInventoriesAnalyzed,
                customerName,
                orderNumber,
                customerEmail,
            })
        )

        // Parallelizing
        // const salePausePromise = Promise.all(disableSellingOutOfStockPromises)
        const notificationPromise = Promise.all(notificationPromises)

        // Get responses
        const [notificationResponses] = await Promise.all([
            // salePausePromise,
            notificationPromise,
        ])

        // Generating order note for admin
        await orderService.generatePreorderNote({
            notificationResponses: notificationResponses.flat(),
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
