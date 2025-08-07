import { OrderService } from '$lib/shopify/services/OrderService';
import { test } from 'vitest';

test(
	'Test Order note',
	async () => {
		const orderService = new OrderService();

		await orderService.addComment(11787425644892, 'test');
	},
	{ timeout: 15000 }
);
