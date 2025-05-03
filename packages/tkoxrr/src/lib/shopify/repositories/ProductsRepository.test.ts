import { ProductsRepository } from '$lib/shopify/repositories/ProductsRepository'
import { test } from 'vitest'

test('Test variant', async () => {
	const productsRepository = new ProductsRepository()

	const r = await productsRepository.getVariantInventories([
		'gid://shopify/ProductVariant/50707113443641',
	])

	console.log(r)
})
