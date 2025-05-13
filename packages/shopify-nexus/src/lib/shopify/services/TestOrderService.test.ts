import { PUBLIC_NEXUS_BASE_URL } from '$env/static/public'
import { TestOrderService } from '$lib/shopify/services/TestOrderService'
import { TestProductService } from '$lib/shopify/services/TestProductService'
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
		const lineItems = [
			{
				quantity: 30,
				variantId: variants[0].id,
				productId,
				requiresShipping: true,
			},
			{
				quantity: 1,
				variantId: variants[1].id,
				productId,
				requiresShipping: true,
			},
		]

		const r = await testOrderService.createOrder(lineItems)

		expect(r).toBeTruthy()

		console.log(`Order created. Shopify should hit ${PUBLIC_NEXUS_BASE_URL} webhook in a moment.`)
	})
})
