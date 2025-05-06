import {
	webhookSubscriptionCreate,
	type WebhookSubscriptionCreateInput,
	type WebhookSubscriptionCreateResponse,
} from '$lib/shopify/mutations/webhookSubscriptionCreate'
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
}
