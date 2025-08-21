import { SHOPIFY_API_SECRET } from '$env/static/private'
import { verifyWebhook } from '$lib/utils/verifiers/verify-webhook'
import type { RequestEvent } from '@sveltejs/kit'
import { json } from '@sveltejs/kit'

const VERBOSE = true

export async function POST(event) {
	if (VERBOSE) console.log('Webhook is hitting API.')

	// Check if hitting localhost or ngrok
	const host = event.request.headers.get('host') || event.url.hostname
	const isLocalhost = host?.includes('localhost') || host?.includes('127.0.0.1')
	const isNgrok = host?.includes('ngrok') || host?.includes('ngrok.io')
	const isLocalOrNgrok = isLocalhost || isNgrok

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

		if (!shopifyDomain) {
			if (VERBOSE) console.log('No shop domain')
			return new Response('No shop domain', { status: 401 })
		}

		if (!whiteListedDomains.includes(shopifyDomain)) {
			if (VERBOSE) console.log('Not a whitelisted domain')
			return new Response('Not a whitelisted domain', { status: 401 })
		}

		// Verify webhook authenticity
		const verified = verifyWebhook(rawBody, hmacHeader, SHOPIFY_API_SECRET)

		if (!verified && !isLocalOrNgrok) {
			if (VERBOSE) console.log('Invalid webhook signature')
			return new Response('Invalid webhook signature', { status: 401 })
		}

		// Parse the webhook body
		const webhookData = JSON.parse(rawBody)

		// Handle the webhook based on the topic
		const topic = request.headers.get('x-shopify-topic')

		if (topic) {
			if (VERBOSE) console.log(`Topic ${topic} received.`)
			return await proxy(event, topic, webhookData)
		}

		if (VERBOSE) console.log(`Exit without proxying to a topic.`)

		return json({ success: true })
	} catch (error) {
		console.error('Webhook error:', error)
		return new Response('Webhook processing failed', { status: 500 })
	}
}

async function proxy(event: RequestEvent, topic: string, webhookData: any): Promise<Response> {
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

		return response
	} catch (error) {
		console.error(`Failed to proxy webhook ${topic}:`, error)
		throw error
	}
}
