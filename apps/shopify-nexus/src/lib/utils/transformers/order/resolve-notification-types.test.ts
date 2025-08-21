import type { OrdersCreateWebhookBody } from '$lib/shopify/types/webhooks-payload/orders-create-webhook-body'
import { loadWebhookData, WebhookType } from '$lib/utils/files/load-webhook-data'
import { parseOrderWebhook } from '$lib/utils/transformers/order/parse-order-webhook'
import { test } from 'vitest'

test('Determine what notifications need to be sent to the customer', async () => {
    const webhookData = await loadWebhookData<OrdersCreateWebhookBody>(WebhookType.ORDER_CREATE)

    const { notificationGroups } = await parseOrderWebhook(webhookData)

    console.log(notificationGroups[0])
})
