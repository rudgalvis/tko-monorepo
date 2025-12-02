/**
 * Cloudflare Worker API Client
 * 
 * Handles all API calls to Cloudflare Workers
 * These calls are made directly from the browser to leverage Cloudflare's edge network
 */

const CLOUDFLARE_GEO_WORKER_URL = 'https://geo-location.rokas-239.workers.dev';

/**
 * GeoData interface matching Cloudflare Worker response
 */
export interface GeoData {
	country: string | null;
	countryName: string | null;
	city: string | null;
	region: string | null;
	regionCode: string | null;
	timezone: string | null;
	latitude: string | null;
	longitude: string | null;
	postalCode: string | null;
	continent: string | null;
	asn: number | null;
	colo: string | null;
}

/**
 * Get user's country code from Cloudflare Worker
 * Calls Cloudflare Worker directly from browser to use Cloudflare's built-in geolocation
 * This uses Cloudflare's request.cf which has the user's actual location (no external API needed)
 * 
 * @param signal - Optional AbortSignal for request cancellation
 * @returns ISO country code (e.g., 'US', 'LT', 'GB') or null
 */
export const getGeolocation = async (signal?: AbortSignal): Promise<string | null> => {
	try {
		// Add cache-busting query parameter with timestamp and random component
		// Using cache: 'no-store' option instead of headers to avoid CORS issues
		const url = new URL(CLOUDFLARE_GEO_WORKER_URL);
		url.searchParams.set('_t', `${Date.now()}-${Math.random().toString(36).substring(7)}`);
		
		const response = await fetch(url.toString(), {
			method: 'GET',
			headers: {
				'Accept': 'application/json'
			},
			cache: 'no-store', // Prevent browser caching (fetch API option, not a header)
			credentials: 'omit', // Don't send cookies - prevents cookie-based caching
			signal
		});

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}`);
		}

		const data: GeoData = await response.json();
		return data.country || null;
	} catch (error) {
		if (error instanceof Error && error.name === 'AbortError') {
			throw error; // Re-throw abort errors so caller can handle timeout
		}
		console.error('Failed to get geolocation from Cloudflare Worker:', error);
		return null;
	}
};

/**
 * Get full geolocation data from Cloudflare Worker
 * Returns complete GeoData object with country, city, region, timezone, etc.
 * 
 * @param signal - Optional AbortSignal for request cancellation
 * @returns Full GeoData object or null
 */
export const getGeoData = async (signal?: AbortSignal): Promise<GeoData | null> => {
	try {
		// Add cache-busting query parameter with timestamp and random component
		// Using cache: 'no-store' option instead of headers to avoid CORS issues
		const url = new URL(CLOUDFLARE_GEO_WORKER_URL);
		url.searchParams.set('_t', `${Date.now()}-${Math.random().toString(36).substring(7)}`);
		
		const response = await fetch(url.toString(), {
			method: 'GET',
			headers: {
				'Accept': 'application/json'
			},
			cache: 'no-store', // Prevent browser caching (fetch API option, not a header)
			credentials: 'omit', // Don't send cookies - prevents cookie-based caching
			signal
		});

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}`);
		}

		const data: GeoData = await response.json();
		return data;
	} catch (error) {
		if (error instanceof Error && error.name === 'AbortError') {
			throw error; // Re-throw abort errors so caller can handle timeout
		}
		console.error('Failed to get geo data from Cloudflare Worker:', error);
		return null;
	}
};


