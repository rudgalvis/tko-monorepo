// import { ProductsRepository } from '$lib/shopify/repositories/ProductsRepository'
// import { generateVariantGid } from '$lib/utils/generators/gid-generator'
// import { test } from 'vitest'
import {test} from 'vitest'
import { generateVariantGid } from '$lib/utils/generators/gid-generator'
import { ProductsRepository } from './ProductsRepository';

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


 test('Test getting final variant price', async () => {
 	const productsRepository = new ProductsRepository()

 	const a = await productsRepository.getVariantPrice('LT', generateVariantGid(42965239693555));

 	console.log(a)
 })

test('Test getting product ID from variant', async () => {
	const productsRepository = new ProductsRepository()

	const variantGid = generateVariantGid(42965239693555)
	const productId = await productsRepository.getProductIdFromVariant(variantGid)

	console.log('Variant GID:', variantGid)
	console.log('Product ID:', productId)
})

// test('Get all available product variants and with compared_at price', async () => {
// 	const productsRepository = new ProductsRepository()
//
// 	const r = await productsRepository.getAllAvailableVariantsWithComparedAtPrice()
//
// 	console.log(r)
// })