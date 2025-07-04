import { MailingService } from '$lib/mailing/MailingService'
import { parseOrderWebhook } from '$lib/utils/transformers/order/parse-order-webhook'
import fs from 'fs'
import { test } from 'vitest'

test('MailingService', async () => {
	const mailingService = new MailingService()

	await mailingService.sendSingleItemPreorderMail('rokas@rudgalvis.com', {
		customerName: 'Rokas',
		productTitle: 'Delcia Lemon',
		orderId: '123123',
		estimatedShippingDate: '2024 04 04',
	})
})

test('Test creating pre order notification', async () => {
	const mailingService = new MailingService()

	const data = fs.readFileSync('./test-data/webhook-payload/orders_create.json', {
		encoding: 'utf8',
	})

	try {
		const webhookData = JSON.parse(data)

		const { orderLineInventoriesAnalyzed, customerName, orderId, customerEmail } =
			await parseOrderWebhook(webhookData)

		mailingService.sendPreorderNotifications({
			orderLineInventoriesAnalyzed,
			customerName,
			orderId: orderId.toString(),
			customerEmail,
		})
	} catch (e) {
		console.error('Failed to parse order lines', e)
	}
})
