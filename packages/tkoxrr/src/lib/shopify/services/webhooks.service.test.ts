import {
	count,
	deleteAllWebhooks,
	listAllWebhooks,
	registerShopifyWebhook
} from '$lib/shopify/services/webhooks.service';
import { WebhookService } from "$lib/shopify/services/WebhookService";
import { test, expect, describe } from 'vitest';

test('register webhook', async () => {
	await registerShopifyWebhook();
});

test('list webhook', async () => {
	const webhookList = await listAllWebhooks();

	console.log(webhookList);
});

test('count webhook', async () => {
	await count();
});

test('delete all webhooks', async () => {
	await deleteAllWebhooks();
	const webhookList = await listAllWebhooks();

	expect(webhookList.length).toBe(0);
});

describe('Setting up and testing webhooks', () => {
	const webhookService = new WebhookService()
	test('Register webhook', async () => {

		const data = await webhookService.registerOrderCreateWebhook()
		console.log(data)
	});
})