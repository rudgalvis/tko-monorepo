import {
	count,
	deleteAllWebhooks,
	listAllWebhooks,
	registerShopifyWebhook
} from '$lib/shopify/services/webhooks.service';
import { test, expect } from 'vitest';

test('register webhook', async () => {
	await registerShopifyWebhook();
});

test('list webhook', async () => {
	const webhookList = await listAllWebhooks();

	console.log(webhookList[0].node);
});

test('count webhook', async () => {
	await count();
});

test('delete all webhooks', async () => {
	await deleteAllWebhooks();
	const webhookList = await listAllWebhooks();

	expect(webhookList.length).toBe(0);
});
