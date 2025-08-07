import { ProductsRepository } from '$lib/shopify/repositories/ProductsRepository'
import { generateVariantGid } from '$lib/utils/generators/gid-generator'
import { test } from 'vitest'

test('Test variant', async () => {
	const productsRepository = new ProductsRepository()

//	const r = await productsRepository.getVariantInventories([
//		'gid://shopify/ProductVariant/50707113443641',
//	])

    const variantIds = [{ variant_id: 55198759453020 }].map(({ variant_id }) => generateVariantGid(variant_id))

	const r = await productsRepository.getVariantInventories(variantIds)

	console.log(r)
})

test('Test colors', async () => {
	const productsRepository = new ProductsRepository()

	const r = await productsRepository.getProductByHandle({
		handle: 'delcia'
})

	console.log(r)
})


test('Test colors', async () => {
	const productsRepository = new ProductsRepository()

	const r = await productsRepository.getProductByHandle({
		handle: 'delcia'
})

	console.log(r)
})


test('Test getting final variant price', async () => {
	const productsRepository = new ProductsRepository()

	const a = await productsRepository.getVariantPrice('LT', generateVariantGid(42965242544371));

	console.log(a)
})