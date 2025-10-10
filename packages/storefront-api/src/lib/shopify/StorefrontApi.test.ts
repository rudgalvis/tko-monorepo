import { StorefrontApi } from "$lib/shopify/StorefrontApi.js";
import { test } from 'vitest';


test('test', async () => {
	const storefrontApi = new StorefrontApi()
	const a = await storefrontApi.getPreOrderMessage('delcia-lemon-cotton-sweater', 54204479766876);

	console.log(a);
});

test('Test automatic variant discount', async () => {
	const storefrontApi = new StorefrontApi()
	const a = await storefrontApi.getAutomaticDiscountForVariant('LT', 55226119979356);

	console.log(a);
});


test('Test automatic product discount', async () => {
	const storefrontApi = new StorefrontApi()
	const a = await storefrontApi.getAutomaticDiscountForProduct('FR', 7485371416819);

	console.log(a);
});
