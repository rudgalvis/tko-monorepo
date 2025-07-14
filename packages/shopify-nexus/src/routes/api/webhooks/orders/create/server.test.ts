import fs from 'fs'
import { test } from 'vitest'
import { handlePreOrders } from './+server'

test('Testing webhook handler with store webhook data', async () => {
	const data = fs.readFileSync('./test-data/webhook-payload/orders_create.json', {
		encoding: 'utf8',
	})

	try {
		const webhookData = JSON.parse(data)
		await handlePreOrders(webhookData)
	} catch (e) {
		console.error(e)
	}
})
