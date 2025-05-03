import { parseOrderWebhook } from '$lib/utils/transformers/order/parse-order-webhook';
import fs from 'fs';
import { test } from 'vitest';

test('Transform order line items to inventory details', async () => {
	const data = fs.readFileSync('./test-data/webhook-payload/orders_create.json', {
		encoding: 'utf8'
	});

	try {
		const webhookData = JSON.parse(data);

		const { orderLineInventories } = await parseOrderWebhook(webhookData);

		console.log(orderLineInventories);
	} catch (e) {
		console.error('Failed to parse order lines', e);
	}
});
