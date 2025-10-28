import { CacheService } from './CacheService';
import { getAvailableMarkets as getConfiguredMarkets } from './config';
import type { Market, Variant, PriceFetchResult } from './types';
import { NexusApi } from 'storefront-api';
import {PUBLIC_NEXUS_BASE_URL} from '$env/static/public';

/**
 * Data providers that connect to actual data sources
 */

// Initialize NexusApi
const nexusApi = new NexusApi();

// Cache variant IDs globally since they're the same for all markets
let cachedVariantIds: string[] | null = null;

// Get available markets from config
async function getAvailableMarkets(): Promise<Market[]> {
	return getConfiguredMarkets();
}

/**
 * Get products for a specific market
 * Note: Currently, variants are the same for all markets
 * This may change in the future
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getProductsForMarket(_marketId: string): Promise<Variant[]> {
	console.log(PUBLIC_NEXUS_BASE_URL)
	// Fetch variant IDs if not already cached
	if (!cachedVariantIds) {
		const variantIds = await nexusApi.getAvailableVariantIds();
		
		if (!variantIds) {
			throw new Error('Failed to fetch available variant IDs from NexusApi');
		}
		
		cachedVariantIds = variantIds;
		console.log(`Fetched ${cachedVariantIds.length} variant IDs from NexusApi`);
	}

	// Convert variant IDs to Product format
	// The variant IDs are in the format: "gid://shopify/ProductVariant/123"
	// We use onlye the number part of GIT
	const products: Variant[] = cachedVariantIds.map((variantId) => ({
		id: parseInt(variantId.split('/').pop() || '0')
	}));

	return products;
}

// Mock: Fetch price for a product in a specific market
async function fetchPrice(productId: string, marketId: string): Promise<PriceFetchResult> {
	// TODO: Replace with actual API call
	// Simulate network delay
	const delay = Math.random() * 500 + 100; // 100-600ms
	await new Promise((resolve) => setTimeout(resolve, delay));

	// Simulate 95% success rate
	const success = Math.random() > 0.05;

	return {
		product_id: productId,
		market_id: marketId,
		success,
		duration_ms: delay,
		error: success ? undefined : 'Simulated API error'
	};
}

/**
 * Singleton instance of CacheService
 */
let cacheServiceInstance: CacheService | null = null;

export function getCacheService(): CacheService {
	if (!cacheServiceInstance) {
		cacheServiceInstance = new CacheService(
			{
				getAvailableMarkets,
				getProductsForMarket,
				fetchPrice
			},
			'.cache/price-cache'
		);
	}
	return cacheServiceInstance;
}

export function resetCacheService(): void {
	if (cacheServiceInstance) {
		cacheServiceInstance.reset();
		cacheServiceInstance = null;
	}
}

