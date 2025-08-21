import { MailingService } from '$lib/mailing/MailingService'
import type { NotificationGroupRequirement } from '$lib/utils/transformers/order/resolve-notification-groups'
import { parseOrderWebhook } from '$lib/utils/transformers/order/parse-order-webhook'
import fs from 'fs'
import { test } from 'vitest'
import { notificationGroupHandlingStrategy } from '$lib/utils/helpers/notification-group-handling-strategy'

test('MailingService', async () => {
    const mailingService = new MailingService()

    const r = await mailingService.sendSingleItemPreorderMail('rokas@rudgalvis.com', {
        customerName: 'Rokas',
        productTitle: 'Delcia Lemon',
        orderId: '123123',
        estimatedShippingDate: '2024 04 04',
    })

    console.log(r)
})

test('Test creating pre order notification', async () => {
    const mailingService = new MailingService()

    const data = fs.readFileSync('./test-data/webhook-payload/orders_create.json', {
        encoding: 'utf8',
    })

    try {
        const webhookData = JSON.parse(data)

        const {
            notificationGroups,
            orderLineInventoriesAnalyzed,
            customerName,
            orderNumber,
            customerEmail,
        } = await parseOrderWebhook(webhookData)

        const notificationPromises = notificationGroups.map(
            notificationGroupHandlingStrategy({
                mailingService,
                orderLineInventoriesAnalyzed,
                customerName,
                orderNumber,
                customerEmail,
            })
        )

        const r = await Promise.all(notificationPromises)

        console.log(r)
    } catch (e) {
        console.error('Failed to parse order lines', e)
    }
})
