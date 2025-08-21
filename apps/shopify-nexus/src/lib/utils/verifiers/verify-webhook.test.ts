import { verifyWebhook } from '$lib/utils/verifiers/verify-webhook'
import fs from 'fs'
import { test } from 'vitest'

test('test', () => {
	try {
		const hmacHeader = fs.readFileSync('./test-data/webhook-payload/hmacHeader', {
			encoding: 'utf8',
		})
		let rawBody = fs.readFileSync('./test-data/webhook-payload/rawBody.json', {
			encoding: 'utf8',
		})
		const SHOPIFY_API_SECRET = fs.readFileSync('./test-data/webhook-payload/SHOPIFY_API_SECRET', {
			encoding: 'utf8',
		})

		rawBody = JSON.parse(rawBody)

		console.log(verifyWebhook(JSON.stringify(rawBody), hmacHeader, SHOPIFY_API_SECRET))
	} catch (e) {
		console.log(e)
	}
})
