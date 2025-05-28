import { StorefrontApi } from "$lib/shopify/StorefrontApi.js";
import { test } from 'vitest';


test('test', async () => {
	const storefrontApi = new StorefrontApi()
	const a = await storefrontApi.getPreOrderMessage('delcia-lemon-cotton-sweater', 54204479766876);

	console.log(a);
});

test('Test automatic variant discount', async () => {
	const storefrontApi = new StorefrontApi()
	const a = await storefrontApi.getAutomaticDiscountForVariant('FR', 54488371429724);

	console.log(a);
});


test('Test automatic product discount', async () => {
	const storefrontApi = new StorefrontApi()
	const a = await storefrontApi.getAutomaticDiscountForProduct('FR', 7485371416819);

	console.log(a);
});

test('Test getting final variant price', async () => {
	const storefrontApi = new StorefrontApi()
	const a = await storefrontApi.getFinalVariantPrice('LT', 42965242544371);

	console.log(a)
})