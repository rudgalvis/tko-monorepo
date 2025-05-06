import { getProductDiscount } from '$lib/utils/shopify/product-discount.js';
import { test } from 'vitest';

test('a', async () => {
	const discount = await getProductDiscount('LT', 53868744704348);
	console.log(discount);
});
