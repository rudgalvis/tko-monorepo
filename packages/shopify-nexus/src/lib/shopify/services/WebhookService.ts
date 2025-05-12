import { PUBLIC_NEXUS_BASE_URL } from '$env/static/public'
import { WebhookRepository } from '$lib/shopify/repositories/WebhookRepository'

export class WebhookService {
	constructor(private repository = new WebhookRepository()) {}

	async registerOrderCreateWebhook() {
		return await this.repository.subscriptionCreate({
			topic: 'ORDERS_CREATE',
			webhookSubscription: {
				callbackUrl: `${PUBLIC_NEXUS_BASE_URL}/api/webhooks`,
				format: 'JSON',
			},
		})
	}

	async listAll() {
		return await this.repository.list()
	}

	async deleteById(id: string) {
		return await this.repository.delete(id)
	}
}
