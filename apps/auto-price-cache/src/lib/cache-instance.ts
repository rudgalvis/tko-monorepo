import { CacheService } from './CacheService';
import { getAvailableMarkets as getConfiguredMarkets } from './config';
import type { Market, Variant, PriceFetchResult } from './types';
import { NexusApi } from 'storefront-api';

/**
 * Data providers that connect to actual data sources
 */

// Initialize NexusApi
const nexusApi = new NexusApi();

// Cache variant IDs globally since they're the same for all markets
let cachedVariantIds: string[] | null = null;

// Hardcoded base URL for the automatic-discount-cache service production
const VARNISH_CACHE_BASE_URL = 'https://a16t-cache-control.tko.rudgalvis.com';

/**
 * Invalidate Varnish cache for a specific path
 */
async function invalidateVarnishCache(path: string): Promise<void> {
	try {
		const banUrl = `${VARNISH_CACHE_BASE_URL}/ban/${path}`;
		
		const response = await fetch(banUrl);
		
		if (!response.ok) {
			console.warn(`[VarnishCache] Failed to invalidate Varnish cache for ${path}: ${response.status}`);
		} else {
			console.log(`[VarnishCache] Varnish cache invalidated for ${path}`);
		}
	} catch (error) {
		// Silent fail - don't break the main process if cache invalidation fails
		console.error('Failed to invalidate Varnish cache:', error);
	}
}

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

// Fetch price for a product in a specific market using Nexus API
async function fetchPrice(variantId: string, marketId: string): Promise<PriceFetchResult> {
	const startTime = performance.now();
	const variantIdNum = parseInt(variantId);
	
	// Construct the URL for logging purposes
	const url = `automatic-discount/${marketId}/${variantIdNum}`;
	
	try {
		// Invalidate Varnish cache before fetching from Nexus API
		await invalidateVarnishCache(url);
		
		const result = await nexusApi.getVariantAutomaticDiscount(marketId, variantIdNum);
		const duration = performance.now() - startTime;
		
		if (result === undefined) {
			const fetchResult = {
				product_id: variantId,
				market_id: marketId,
				success: false,
				duration_ms: duration,
				error: 'Failed to fetch variant automatic discount from Nexus API',
				url
			};
			
			// Log the failed fetch
			logFetchCall(fetchResult);
			
			return fetchResult;
		}
		
		const fetchResult = {
			product_id: variantId,
			market_id: marketId,
			success: true,
			duration_ms: duration,
			url
		};
		
		// Log the successful fetch
		logFetchCall(fetchResult);
		
		return fetchResult;
	} catch (error) {
		const duration = performance.now() - startTime;
		const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
		
		const fetchResult = {
			product_id: variantId,
			market_id: marketId,
			success: false,
			duration_ms: duration,
			error: errorMessage,
			url
		};
		
		// Log the failed fetch
		logFetchCall(fetchResult);
		
		return fetchResult;
	}
}

/**
 * Log a fetch call to the fetch log service
 */
function logFetchCall(result: PriceFetchResult): void {
	try {
		const cacheService = getCacheService();
		const fetchLogService = cacheService.getFetchLogService();
		
		fetchLogService.logFetch({
			url: result.url || 'unknown',
			product_id: result.product_id,
			market_id: result.market_id,
			success: result.success,
			duration_ms: result.duration_ms,
			error: result.error
		});
	} catch (error) {
		// Silent fail - don't break the main process if logging fails
		console.error('Failed to log fetch call:', error);
	}
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

