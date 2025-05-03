import { TestOrderService } from '$lib/shopify/services/TestOrderService'
import { TestProductService } from '$lib/shopify/services/TestProductService'
import { describe, expect, test } from 'vitest'

describe.sequential('Should setup test product and perform test order', () => {
	const testProductServices = new TestProductService()
	const testOrderService = new TestOrderService()

	test(
		'Should create order on newly created product',
		async () => {
			const {
				product: { id: productId },
				variants,
			} = await testProductServices.createProduct()

			// As if adding to cart here
			const lineItems = [
				{
					quantity: 30,
					variantId: variants[1].id,
					productId,
					requiresShipping: true,
				},
				{
					quantity: 1,
					variantId: variants[2].id,
					productId,
					requiresShipping: true,
				},
			]

			const r = await testOrderService.createOrder(lineItems, productId)

			expect(r).toBeTruthy()

			console.log('Order created. Shopify should hit the webhook in a moment.')
		},
		{ timeout: 15000 }
	)
})
