import { storefrontApi } from '$lib/api/storefront-api.js';
import { test } from 'vitest';

test('test', async () => {
	const a = await storefrontApi().getPreOrderMessage('delcia-lemon-cotton-sweater', 49342086119772);

	console.log(a);
});
