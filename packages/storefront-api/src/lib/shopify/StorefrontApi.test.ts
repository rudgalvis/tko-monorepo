import { StorefrontApi } from '$lib/shopify/StorefrontApi.js';
import { test, describe, expect } from 'vitest';

describe('StorefrontApi', () => {
	const storefrontApi = new StorefrontApi();

	test('should get all available variants through service', async () => {
		const result = await storefrontApi.getAllAvailableVariants({
			first: 3
		});
		
		expect(result).toBeDefined();
		expect(result.products).toBeDefined();
		expect(result.products.edges).toBeDefined();
		expect(Array.isArray(result.products.edges)).toBe(true);
		
		console.log('Service layer - Available variants result:', {
			hasNextPage: result.products.pageInfo.hasNextPage,
			productCount: result.products.edges.length,
			firstProduct: result.products.edges[0]?.node
		});
	});

	test('should handle pagination through service', async () => {
		const result = await storefrontApi.getAllAvailableVariants({
			first: 1
		});
		
		expect(result).toBeDefined();
		expect(result.products.edges.length).toBeLessThanOrEqual(1);
		
		// Test pagination if there are more results
		if (result.products.pageInfo.hasNextPage) {
			const nextResult = await storefrontApi.getAllAvailableVariants({
				first: 1,
				after: result.products.pageInfo.endCursor || undefined
			});
			
			expect(nextResult).toBeDefined();
			expect(nextResult.products.edges.length).toBeLessThanOrEqual(1);
			console.log('Service layer - Pagination test successful');
		}
	});

	test('should get all products through service with pagination', async () => {
		const result = await storefrontApi.getAllProducts(3); // Small page size for testing
		
		expect(result).toBeDefined();
		expect(result.data).toBeDefined();
		expect(Array.isArray(result.data)).toBe(true);
		expect(result.totalFetched).toBeGreaterThan(0);
		
		console.log('Service layer - All products result:', {
			totalFetched: result.totalFetched,
			hasNextPage: result.hasNextPage,
			firstProduct: result.data[0]
		});
	});

	test('should get all available variants from all products through service', async () => {
		const result = await storefrontApi.getAllAvailableVariantsFromAllProducts(50); // Small page size for testing
		
		expect(result).toBeDefined();
		expect(result.allVariants).toBeDefined();
		expect(Array.isArray(result.allVariants)).toBe(true);
		expect(result.totalProducts).toBeGreaterThan(0);
		expect(result.totalVariants).toBeGreaterThanOrEqual(0);
		
		console.log('Service layer - All available variants result:', {
			totalProducts: result.totalProducts,
			totalVariants: result.totalVariants,
			firstVariant: result.allVariants[0]
		});
	}, {timeout: 10000});

	test('should get all available variant IDs through service', async () => {
		const variantIds = await storefrontApi.getAllAvailableVariantIds(100); // Small page size for testing
		
		expect(variantIds).toBeDefined();
		expect(Array.isArray(variantIds)).toBe(true);
		expect(variantIds.length).toBeGreaterThanOrEqual(0);
		
		// Check that all IDs are strings and follow the expected format
		variantIds.forEach(id => {
			expect(typeof id).toBe('string');
			expect(id).toMatch(/^gid:\/\/shopify\/ProductVariant\/\d+$/);
		});
		
		console.log('Service layer - Variant IDs result:', {
			totalVariantIds: variantIds.length,
			firstFewIds: variantIds.slice(0, 3)
		});
	}, {timeout: 10000});
});