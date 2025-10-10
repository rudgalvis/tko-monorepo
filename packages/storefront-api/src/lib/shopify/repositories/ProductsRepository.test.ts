import { ProductsRepository } from '$lib/shopify/repositories/ProductsRepository.js';
import { generateProductGid, generateVariantGid } from '$lib/shopify/utils/generators/gid-generator.js';
import { test } from 'vitest';


test('test', async () => {
	const productsRepository = new ProductsRepository()
	const a = await productsRepository.getProduct( generateProductGid(15248668295516));

	console.log(a);
});
