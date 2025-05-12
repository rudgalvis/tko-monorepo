import { makeShopifyApi } from '$lib/shopify/make-api'
import {
	webhookSubscriptionCreate,
	type WebhookSubscriptionCreateInput,
	type WebhookSubscriptionCreateResponse,
} from '$lib/shopify/mutations/webhookSubscriptionCreate'
import {
	webhookSubscriptionDelete,
	type WebhookSubscriptionDeleteResponse,
} from '$lib/shopify/mutations/webhookSubscriptionDelete'
import {
	type WebhookNode,
	webhookSubscription,
	type WebhookSubscriptionReturn,
} from '$lib/shopify/queries/webhookSubscription'
import { BaseRepository } from '$lib/shopify/repositories/BaseRepository'

export type UserError = {
	field: string[]
	message: string
}

export class WebhookRepository extends BaseRepository {
	async subscriptionCreate(input: WebhookSubscriptionCreateInput) {
		const { data, errors } = await this.client.request<WebhookSubscriptionCreateResponse>(
			webhookSubscriptionCreate,
			{
				variables: input,
			}
		)

		if (errors) throw new Error(errors.message)

		if (!data) throw new Error('No data returned')

		if (data && data.webhookSubscriptionCreate.userErrors.length > 0)
			throw new Error(data.webhookSubscriptionCreate.userErrors[0].message)

		return data.webhookSubscriptionCreate.webhookSubscription
	}

	async list(): Promise<WebhookNode[]> {
		try {
			const { data, errors } = await this.client.request<WebhookSubscriptionReturn>(webhookSubscription)

			if (errors) throw new Error(errors.message)

			if (!data) throw new Error('No data returned')

			return data.webhookSubscriptions?.edges.map(({ node }) => node) || []
		} catch (error) {
			console.error('Failed to register webhook:', error)

			return []
		}
	}

	async delete(id: string) {
		try {
			const { data, errors } = await this.client.request<WebhookSubscriptionDeleteResponse>(webhookSubscriptionDelete, { variables: { id } });

			if (errors) throw new Error(errors.message)

			if (!data) throw new Error('No data returned')

			if(data.webhookSubscriptionDelete.userErrors.length > 0) {
				throw new Error(data.webhookSubscriptionDelete.userErrors[0].message)
			}

			return data.webhookSubscriptionDelete.deletedWebhookSubscriptionId || null
		} catch (e) {
			console.error('Failed to delete webhook:', e)

			return null
		}
	}
}
