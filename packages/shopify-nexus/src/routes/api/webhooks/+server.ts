import { json } from '@sveltejs/kit'
import type { RequestEvent } from '@sveltejs/kit'
import crypto from 'crypto'
import { SHOPIFY_API_SECRET } from '$env/static/private'

const VERBOSE = true

export async function POST(event) {
	if (VERBOSE) console.log('Webhook is hitting API.')

	try {
		const { request } = event

		// Get the raw body and headers
		const rawBody = await request.text()
		const hmacHeader = request.headers.get('x-shopify-hmac-sha256')
		const shopifyDomain = request.headers.get('x-shopify-shop-domain')
		const whiteListedDomains = [
			'sappsdev.myshopify.com',
			'the-knotty-ones.myshopify.com',
			'theknottyones.com',
		]

		if (!shopifyDomain) return new Response('No shop domain', { status: 401 })

		if (!whiteListedDomains.includes(shopifyDomain))
			return new Response('Not a whitelisted domain', { status: 401 })

		// Verify webhook authenticity
		const verified = verifyWebhook(rawBody, hmacHeader, SHOPIFY_API_SECRET)

		if (!verified) {
			return new Response('Invalid webhook signature', { status: 401 })
		}

		// Parse the webhook body
		const webhookData = JSON.parse(rawBody)

		// Handle the webhook based on the topic
		const topic = request.headers.get('x-shopify-topic')

		if (topic) await proxy(event, topic, webhookData)

		return json({ success: true })
	} catch (error) {
		console.error('Webhook error:', error)
		return new Response('Webhook processing failed', { status: 500 })
	}
}

async function proxy(event: RequestEvent, topic: string, webhookData: any) {
	try {
		const response = await event.fetch(`/api/webhooks/${topic}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(webhookData),
		})

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}, ${response.statusText}`)
		}

		return await response.json()
	} catch (error) {
		console.error(`Failed to proxy webhook ${topic}:`, error)
		throw error
	}
}

function verifyWebhook(
	rawBody: string,
	hmacHeader: string | null,
	secret: string | undefined
): boolean {
	if (!hmacHeader || !secret) return false

	const hash = crypto.createHmac('sha256', secret).update(rawBody).digest('base64')

	return hash === hmacHeader
}
