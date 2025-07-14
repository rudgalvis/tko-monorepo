import { PUBLIC_NEXUS_BASE_URL } from '$env/static/public'
import { TestOrderService } from '$lib/shopify/services/TestOrderService'
import { TestProductService } from '$lib/shopify/services/TestProductService'
import { generateVariantGid, generateProductGid } from 'common-utils'
import { describe, expect, test } from 'vitest'

describe.sequential('Should setup test product and perform test order', () => {
	const testProductServices = new TestProductService()
	const testOrderService = new TestOrderService()

	test('Should create order on newly created product', { timeout: 15000 }, async () => {
		const {
			product: { id: productId },
			variants,
		} = await testProductServices.createProduct()

		// 0 In stock, pre-order-able
		// 1 Out of stock, pre-order-able
		// 2 Out of stock, pre-order-able, no limit
		// 3 Out of stock, pre-order-able, no expected date

		// As if adding to cart here
		const r1 = await testOrderService.createOrder([
//			{
//				quantity: 1,
//				variantId: generateVariantGid(54022808371548),
//				productId: generateProductGid(14898086445404),
//				requiresShipping: true,
//			},
//			{
//				quantity: 1,
//				variantId: generateVariantGid(54022679527772),
//				productId: generateProductGid(14898059247964),
//				requiresShipping: true,
//			},
//			{
//				quantity: 1,
//				variantId: generateVariantGid(54022855590236),
//				productId: generateProductGid(14898098078044),
//				requiresShipping: true,
//			},
//			{
//				quantity: 1,
//				variantId: generateVariantGid(54262064283996),
//				productId: generateProductGid(14948388864348),
//				requiresShipping: true,
//			},
//			{
//				quantity: 1,
//				variantId: generateVariantGid(54926550466908),
//				productId: generateProductGid(15097088737628),
//				requiresShipping: true,
//			},
			{
				quantity: 2,
				variantId: variants[1].id,
				productId,
				requiresShipping: true,
			},
		])

		expect(r1).toBeTruthy()

		console.log(`Order created. Shopify should hit ${PUBLIC_NEXUS_BASE_URL} webhook in a moment.`)
	})
})
