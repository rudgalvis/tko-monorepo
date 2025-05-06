import { OrderService } from '$lib/shopify/services/OrderService';
import { test } from 'vitest';

test(
	'Test Order note',
	async () => {
		const orderService = new OrderService();

		await orderService.addComment(6444598886713, 'test');
	},
	{ timeout: 15000 }
);
