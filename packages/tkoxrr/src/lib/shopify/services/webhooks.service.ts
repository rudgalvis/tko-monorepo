// src/lib/shopify/registerWebhook.ts
import { WEBHOOK_LISTENER_BASE_URL } from '$env/static/private'
import { makeShopifyApi } from '$lib/shopify/make-api'
import { webhookSubscriptionCreate } from '$lib/shopify/mutations/webhookSubscriptionCreate'
import { webhookSubscriptionDelete } from '$lib/shopify/mutations/webhookSubscriptionDelete'
import { webhookSubscription } from '$lib/shopify/queries/webhookSubscription'
import { webhookSubscriptionsCount } from '$lib/shopify/queries/webhookSubscriptionsCount'

export async function registerShopifyWebhook() {
	try {
		const { client } = makeShopifyApi()
		const {
			data: { webhookSubscriptionCreate: b },
		} = await client.request(webhookSubscriptionCreate, {
			variables: {
				topic: 'ORDERS_CREATE',
				webhookSubscription: {
					callbackUrl: `${WEBHOOK_LISTENER_BASE_URL}/api/webhooks`,
					format: 'JSON',
				},
			},
		})

		console.log(b)
	} catch (error) {
		console.error('Failed to register webhook:', error)
	}
}

export async function listAllWebhooks(): Promise<any[]> {
	try {
		const { client } = await makeShopifyApi();
		const { data } = await client.request(webhookSubscription);

		return data.webhookSubscriptions?.edges || [];
	} catch (error) {
		console.error('Failed to register webhook:', error);

		return [];
	}
}

export async function count() {
	try {
		const { client } = await makeShopifyApi();
		const { data } = await client.request(webhookSubscriptionsCount, {
			variables: {
				query: 'topic:"orders/create"'
			}
		});

		console.log(data.webhookSubscriptions?.edges);
	} catch (error) {
		console.error('Failed to register webhook:', error);
	}
}

export const deleteWebhook = async (id: string) => {
	try {
		const { client } = await makeShopifyApi();
		const { data } = await client.request(webhookSubscriptionDelete, { variables: { id } });

		console.log(data.webhookSubscriptions?.edges);
	} catch (error) {
		console.error('Failed to register webhook:', error);
	}
};

export const deleteAllWebhooks = async () => {
	const webhookList = await listAllWebhooks();
	await Promise.all(webhookList.map(({ node: { id } }) => deleteWebhook(id)));
};
