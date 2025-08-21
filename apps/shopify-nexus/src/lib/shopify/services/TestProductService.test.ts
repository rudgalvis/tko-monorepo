import { TestProductService } from '$lib/shopify/services/TestProductService'
import { describe, expect, test } from 'vitest'

const VERBOSE = true

describe.sequential('Test product management test suite', () => {
	const testProductServices = new TestProductService()
	let productExists = false

	describe('Phase 1: Initial Setup', () => {
		test('Should ensure test product exists', async () => {
			const testProduct = await testProductServices.findProduct()
			productExists = !!testProduct

			if (!productExists) {
				if (VERBOSE) console.log('No product found, creating new one')
				const product = await testProductServices.createProduct()
				expect(product).toBeDefined()
				productExists = true
				if (VERBOSE) console.log('Created new product:', product)

				expect(product.variants.length).toBe(testProductServices.TEST_PRODUCT_VARIANT_DETAILS.length)
			}

			// Verify product exists after potential creation
			const finalCheck = await testProductServices.findProduct()
			expect(finalCheck).toBeDefined()
		})
	})

	describe('Phase 2: Product Operations', () => {
		test('Should find existing product', async () => {
			const testProduct = await testProductServices.findProduct()
			expect(testProduct).toBeDefined()
			expect(testProduct?.title).toBe(testProductServices.TEST_PRODUCT_TITLE)
			if (VERBOSE) console.log('Found product:', testProduct)
		})

		test('Should delete test product', async () => {
			expect(await testProductServices.deleteProduct()).toBeTruthy()
			const testProduct = await testProductServices.findProduct()
			expect(testProduct).toBeUndefined()

			if (VERBOSE) console.log('Product deleted successfully')
		})
	})
})