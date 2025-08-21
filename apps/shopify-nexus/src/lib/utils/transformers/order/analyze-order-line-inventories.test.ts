import { parseOrderWebhook } from '$lib/utils/transformers/order/parse-order-webhook';
import fs from 'fs';
import { test } from 'vitest';

test('Analyzes ordered items into regular, pre-order, canceled items', async () => {
	const data = fs.readFileSync('./test-data/webhook-payload/orders_create.json', {
		encoding: 'utf8'
	});

	try {
		const webhookData = JSON.parse(data);

		const { orderLineInventoriesAnalyzed } = await parseOrderWebhook(webhookData);

		console.log('orderLineInventoriesAnalyzed', orderLineInventoriesAnalyzed);
	} catch (e) {
		console.error('Failed to parse order lines', e);
	}
});
