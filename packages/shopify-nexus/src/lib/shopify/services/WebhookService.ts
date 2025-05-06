import { WEBHOOK_LISTENER_BASE_URL } from '$env/static/private'
import { WebhookRepository } from '$lib/shopify/repositories/WebhookRepository'

export class WebhookService {
	constructor(private repository = new WebhookRepository()) {}

	async registerOrderCreateWebhook() {
		return await this.repository.subscriptionCreate({
			topic: 'ORDERS_CREATE',
			webhookSubscription: {
				callbackUrl: `${WEBHOOK_LISTENER_BASE_URL}/api/webhooks`,
				format: 'JSON',
			},
		})
	}
}
