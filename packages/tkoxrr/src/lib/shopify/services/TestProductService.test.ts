import { TestProductService } from '$lib/shopify/services/TestProductService'
import { describe, expect, test } from 'vitest'

/**
 * Covering possible cases, let's work with such setup
 */
describe.sequential('Should setup environment for predictable webhook data', () => {
	const testProductServices = new TestProductService()

	test('Should find test product if it exists', async () => {
		const testProduct = await testProductServices.findProduct()

		console.log(testProduct)

		expect(testProduct).toBeDefined()
	})

	test('Should delete test product if found', async () => {
		expect(await testProductServices.deleteProduct()).toBeTruthy()
	})

	test(
		'Should create product with variants and quantities',
		async () => {
			const response = await testProductServices.createProduct()

			console.log(response)
		},
		{ timeout: 15000 }
	)
})
