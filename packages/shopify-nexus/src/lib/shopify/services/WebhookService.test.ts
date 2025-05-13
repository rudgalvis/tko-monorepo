import { WebhookService } from '$lib/shopify/services/WebhookService'
import { describe, expect, test } from 'vitest'

const VERBOSE = true

describe.sequential('Testing webhooks with ORDERS_CREATE', () => {
	const webhookService = new WebhookService()

	let ordersCreateWebhookGid: string | null = null

	test('Should list all webhooks & find ORDERS_CREATE if possible.', async () => {
		const webhookList = await webhookService.listAll()

		if (VERBOSE) console.log({ webhookList, firstUrl: webhookList[0]?.endpoint })

		// Find ORDERS_CREATE
		const ordersCreate = webhookList.find(({ topic }) => 'ORDERS_CREATE' === topic)
		if (ordersCreate) {
			ordersCreateWebhookGid = ordersCreate.id
		}
	})

	test('Should delete ORDERS_CREATE webhook', async ({ skip }) => {
		if (!ordersCreateWebhookGid) return skip()

		const deletedId = await webhookService.deleteById(ordersCreateWebhookGid)

		if(VERBOSE) console.log({ deletedId })

		expect(deletedId).toBe(ordersCreateWebhookGid)
	})

	test('Should creating ORDERS_CREATE webhook', async () => {
		const webhookSubscription = await webhookService.registerOrderCreateWebhook()

		if(VERBOSE) console.log({ webhookSubscription })

		expect(webhookSubscription).toBeDefined()
	}, {timeout: 15000})
})
