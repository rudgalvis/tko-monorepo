import { ProductsRepository } from '$lib/shopify/repositories/ProductsRepository.js';
import { generateProductGid } from '$lib/shopify/utils/generators/gid-generator.js';
import { test, describe, expect } from 'vitest';

describe('ProductsRepository', () => {
	const productsRepository = new ProductsRepository();

	test('should get product by id', async () => {
		const product = await productsRepository.getProduct(generateProductGid(15248668295516));
		expect(product).toBeDefined();
		console.log('Product:', product);
	});

	test('should get all available variants', async () => {
		const result = await productsRepository.getAllAvailableVariants({
			first: 5
		});
		
		expect(result).toBeDefined();
		expect(result.products).toBeDefined();
		expect(result.products.edges).toBeDefined();
		expect(Array.isArray(result.products.edges)).toBe(true);
		
		console.log('Available variants result:', {
			hasNextPage: result.products.pageInfo.hasNextPage,
			productCount: result.products.edges.length,
			firstProduct: result.products.edges[0]?.node
		});
	});

	test('should get all available variants with pagination', async () => {
		const result = await productsRepository.getAllAvailableVariants({
			first: 2
		});
		
		expect(result).toBeDefined();
		expect(result.products.edges.length).toBeLessThanOrEqual(2);
		
		// Test pagination if there are more results
		if (result.products.pageInfo.hasNextPage) {
			const nextResult = await productsRepository.getAllAvailableVariants({
				first: 2,
				after: result.products.pageInfo.endCursor || undefined
			});
			
			expect(nextResult).toBeDefined();
			expect(nextResult.products.edges.length).toBeLessThanOrEqual(2);
			console.log('Pagination test successful');
		}
	});

	test('should get all products with pagination', async () => {
		const result = await productsRepository.getAllProducts(5); // Small page size for testing
		
		expect(result).toBeDefined();
		expect(result.data).toBeDefined();
		expect(Array.isArray(result.data)).toBe(true);
		expect(result.totalFetched).toBeGreaterThan(0);
		
		console.log('All products result:', {
			totalFetched: result.totalFetched,
			hasNextPage: result.hasNextPage,
			firstProduct: result.data[0]
		});
	});

	test('should get all available variants from all products', async () => {
		const result = await productsRepository.getAllAvailableVariantsFromAllProducts(3); // Small page size for testing
		
		expect(result).toBeDefined();
		expect(result.allVariants).toBeDefined();
		expect(Array.isArray(result.allVariants)).toBe(true);
		expect(result.totalProducts).toBeGreaterThan(0);
		expect(result.totalVariants).toBeGreaterThanOrEqual(0);
		
		console.log('All available variants result:', {
			totalProducts: result.totalProducts,
			totalVariants: result.totalVariants,
			firstVariant: result.allVariants[0]
		});
	});

	test('should get all available variant IDs', async () => {
		const variantIds = await productsRepository.getAllAvailableVariantIds(5); // Small page size for testing
		
		expect(variantIds).toBeDefined();
		expect(Array.isArray(variantIds)).toBe(true);
		expect(variantIds.length).toBeGreaterThanOrEqual(0);
		
		// Check that all IDs are strings and follow the expected format
		variantIds.forEach(id => {
			expect(typeof id).toBe('string');
			expect(id).toMatch(/^gid:\/\/shopify\/ProductVariant\/\d+$/);
		});
		
		console.log('Variant IDs result:', {
			totalVariantIds: variantIds.length,
			firstFewIds: variantIds.slice(0, 3)
		});
	});
});
