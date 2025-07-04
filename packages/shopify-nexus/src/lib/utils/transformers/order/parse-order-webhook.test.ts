import { parseOrderWebhook } from '$lib/utils/transformers/order/parse-order-webhook'
import fs from 'fs'
import {test} from 'vitest'

test('Test', async () => {
	const data = fs.readFileSync('./test-data/webhook-payload/orders_create.json', {
		encoding: 'utf8',
	})

	try {
		const webhookData = JSON.parse(data)

		console.log(await parseOrderWebhook(webhookData))
	} catch (e) {
		console.error(e)
	}

})