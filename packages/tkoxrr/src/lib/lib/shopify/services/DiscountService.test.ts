import { DiscountsRepository } from '$lib/shopify/repositories/DiscountsRepository';
import { expect, test } from 'vitest';

test('Should create order on newly created product', async () => {
	const discountsRepository = new DiscountsRepository();

	const data = await discountsRepository.createDraftOrder(
		`gid://shopify/ProductVariant/${53868744704348}`
	);

	console.log(data);
});
