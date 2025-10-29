// import { ProductsRepository } from '$lib/shopify/repositories/ProductsRepository'
// import { generateVariantGid } from '$lib/utils/generators/gid-generator'
// import { test } from 'vitest'

// test('Test variant inventories', async () => {
// 	const productsRepository = new ProductsRepository()

// //	const r = await productsRepository.getVariantInventories([
// //		'gid://shopify/ProductVariant/50707113443641',
// //	])

//     const variantIds = [{ variant_id: 55198759453020 }].map(({ variant_id }) => generateVariantGid(variant_id))

// 	const r = await productsRepository.getVariantInventories(variantIds)

// 	console.log(r)
// })

// test('Test colors', async () => {
// 	const productsRepository = new ProductsRepository()

// 	const r = await productsRepository.getProductByHandle({
// 		handle: 'delčia'
// })

// 	console.log(r)
// })


// test('Test getting final variant price', async () => {
// 	const productsRepository = new ProductsRepository()

// 	const a = await productsRepository.getVariantPrice('LT', generateVariantGid(55226119979356));

// 	console.log(a)
// })

// test('Get all available product variants and with compared_at price', async () => {
// 	const productsRepository = new ProductsRepository()

// 	const r = await productsRepository.getAllAvailableVariantsWithComparedAtPrice()

// 	console.log(r)
// })