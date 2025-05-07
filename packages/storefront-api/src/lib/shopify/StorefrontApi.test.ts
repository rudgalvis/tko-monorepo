import { StorefrontApi } from "$lib/shopify/StorefrontApi.js";
import { test } from 'vitest';


test('test', async () => {
	const storefrontApi = new StorefrontApi()
	const a = await storefrontApi.getPreOrderMessage('delcia-lemon-cotton-sweater', 54204479766876);

	console.log(a);
});

test('Test automatic discount', async () => {
	const storefrontApi = new StorefrontApi()
	const a = await storefrontApi.getAutomaticDiscountForVariant('LT', 54204479766876);

	console.log(a);
});
