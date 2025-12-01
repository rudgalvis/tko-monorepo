import type { RequestEvent } from '@sveltejs/kit';
import type { GeoData } from './types.js';

const GEO_WORKER_URL = 'https://geo-location.rokas-239.workers.dev';

/**
 * Check if IP is a localhost/local network address
 */
function isLocalhostIP(ip: string): boolean {
	return (
		ip === '::1' ||
		ip === '127.0.0.1' ||
		ip === 'localhost' ||
		ip.startsWith('192.168.') ||
		ip.startsWith('10.') ||
		ip.startsWith('172.16.') ||
		ip.startsWith('172.17.') ||
		ip.startsWith('172.18.') ||
		ip.startsWith('172.19.') ||
		ip.startsWith('172.20.') ||
		ip.startsWith('172.21.') ||
		ip.startsWith('172.22.') ||
		ip.startsWith('172.23.') ||
		ip.startsWith('172.24.') ||
		ip.startsWith('172.25.') ||
		ip.startsWith('172.26.') ||
		ip.startsWith('172.27.') ||
		ip.startsWith('172.28.') ||
		ip.startsWith('172.29.') ||
		ip.startsWith('172.30.') ||
		ip.startsWith('172.31.') ||
		ip.startsWith('fe80:') || // IPv6 link-local
		ip === '::'
	);
}

/**
 * Extract client IP address from SvelteKit RequestEvent
 * Priority: CF-Connecting-IP > X-Forwarded-For > X-Real-IP > getClientAddress()
 * 
 * In production behind proxies/load balancers, headers contain the real client IP,
 * while getClientAddress() returns the proxy's internal IP.
 * 
 * @param event - SvelteKit RequestEvent
 * @returns Client IP address or null
 */
export function extractClientIP(event: RequestEvent): string | null {
	// Priority 1: CF-Connecting-IP header (if behind Cloudflare)
	// This is the most reliable header when behind Cloudflare proxy
	const cfConnectingIP = event.request.headers.get('CF-Connecting-IP');
	if (cfConnectingIP) {
		console.log('[Geolocation] Extracted IP from CF-Connecting-IP:', cfConnectingIP);
		return cfConnectingIP;
	}

	// Priority 2: X-Forwarded-For header (first IP in chain)
	// This header is set by most proxies/load balancers
	const xForwardedFor = event.request.headers.get('X-Forwarded-For');
	if (xForwardedFor) {
		// X-Forwarded-For can contain multiple IPs, take the first one (original client)
		const firstIP = xForwardedFor.split(',')[0]?.trim();
		if (firstIP) {
			console.log('[Geolocation] Extracted IP from X-Forwarded-For:', firstIP, '(full header:', xForwardedFor + ')');
			return firstIP;
		}
	}

	// Priority 3: X-Real-IP header (fallback)
	const xRealIP = event.request.headers.get('X-Real-IP');
	if (xRealIP) {
		console.log('[Geolocation] Extracted IP from X-Real-IP:', xRealIP);
		return xRealIP;
	}

	// Priority 4: SvelteKit's built-in getClientAddress() (last resort)
	// Only use this if headers are not available, and skip if it's a localhost IP
	try {
		const clientAddress = event.getClientAddress();
		if (clientAddress && !isLocalhostIP(clientAddress)) {
			console.log('[Geolocation] Extracted IP from getClientAddress():', clientAddress);
			return clientAddress;
		} else if (clientAddress) {
			console.log('[Geolocation] getClientAddress() returned localhost IP, skipping:', clientAddress);
		}
	} catch (error) {
		// getClientAddress() may not be available in all environments
		console.debug('[Geolocation] getClientAddress() not available:', error);
	}

	console.warn('[Geolocation] Could not extract client IP. Available headers:', {
		'CF-Connecting-IP': event.request.headers.get('CF-Connecting-IP'),
		'X-Forwarded-For': event.request.headers.get('X-Forwarded-For'),
		'X-Real-IP': event.request.headers.get('X-Real-IP'),
	});
	return null;
}

/**
 * Get user's country code from IP using Cloudflare Worker
 * This function makes a direct request without client IP context.
 * For server-side requests, use getUserCountryFromRequest() instead.
 * 
 * @deprecated Use getUserCountryFromRequest() for server-side requests
 * @returns ISO country code (e.g., 'US', 'LT', 'GB') or null
 */
export async function getUserCountry(): Promise<string | null> {
	try {
		const response = await fetch(GEO_WORKER_URL);
		if (!response.ok) return null;
		
		const data = await response.json();
		return data.country || null;
	} catch (error) {
		console.error('Failed to get user country:', error);
		return null;
	}
}

/**
 * Get user's country code from request event
 * Extracts client IP and proxies it to Cloudflare Worker
 * 
 * @param event - SvelteKit RequestEvent containing client request
 * @returns ISO country code (e.g., 'US', 'LT', 'GB') or null
 */
export async function getUserCountryFromRequest(event: RequestEvent): Promise<string | null> {
	try {
		const clientIP = extractClientIP(event);
		
		if (!clientIP) {
			console.warn('Could not extract client IP from request');
			return null;
		}

		// Skip geolocation lookup for localhost/local network IPs
		if (isLocalhostIP(clientIP)) {
			console.debug('Skipping geolocation lookup for localhost IP:', clientIP);
			// For localhost, make direct request without IP parameter (uses Cloudflare edge detection)
			const response = await fetch(GEO_WORKER_URL);
			if (!response.ok) {
				console.error(`Cloudflare Worker returned ${response.status}`);
				return null;
			}
			const data: GeoData = await response.json();
			return data.country || null;
		}

		// Proxy request to Cloudflare Worker with client IP
		const url = new URL(GEO_WORKER_URL);
		url.searchParams.set('ip', clientIP);
		
		// Debug logging to diagnose 500 errors
		console.log('[Geolocation] Proxying request with IP:', clientIP);
		console.log('[Geolocation] Full URL:', url.toString());
		
		const response = await fetch(url.toString());
		if (!response.ok) {
			// Get error details from response body
			let errorDetails = '';
			try {
				const errorData = await response.json();
				errorDetails = JSON.stringify(errorData);
			} catch {
				try {
					errorDetails = await response.text();
				} catch {
					errorDetails = 'Could not read error response';
				}
			}
			console.error(`[Geolocation] Cloudflare Worker returned ${response.status}:`, errorDetails);
			console.error(`[Geolocation] Requested IP was: ${clientIP}`);
			return null;
		}
		
		const data: GeoData = await response.json();
		return data.country || null;
	} catch (error) {
		console.error('Failed to get user country from request:', error);
		return null;
	}
}

/**
 * Get full geolocation data from request event
 * Extracts client IP and proxies it to Cloudflare Worker
 * 
 * @param event - SvelteKit RequestEvent containing client request
 * @returns Full GeoData object or null
 */
export async function getGeoDataFromRequest(event: RequestEvent): Promise<GeoData | null> {
	try {
		const clientIP = extractClientIP(event);
		
		if (!clientIP) {
			console.warn('Could not extract client IP from request');
			return null;
		}

		// Skip geolocation lookup for localhost/local network IPs
		if (isLocalhostIP(clientIP)) {
			console.debug('Skipping geolocation lookup for localhost IP:', clientIP);
			// For localhost, make direct request without IP parameter (uses Cloudflare edge detection)
			const response = await fetch(GEO_WORKER_URL);
			if (!response.ok) {
				console.error(`Cloudflare Worker returned ${response.status}`);
				return null;
			}
			const data: GeoData = await response.json();
			return data;
		}

		// Proxy request to Cloudflare Worker with client IP
		const url = new URL(GEO_WORKER_URL);
		url.searchParams.set('ip', clientIP);
		
		// Debug logging to diagnose 500 errors
		console.log('[Geolocation] Proxying request with IP:', clientIP);
		console.log('[Geolocation] Full URL:', url.toString());
		
		const response = await fetch(url.toString());
		if (!response.ok) {
			// Get error details from response body
			let errorDetails = '';
			try {
				const errorData = await response.json();
				errorDetails = JSON.stringify(errorData);
			} catch {
				try {
					errorDetails = await response.text();
				} catch {
					errorDetails = 'Could not read error response';
				}
			}
			console.error(`[Geolocation] Cloudflare Worker returned ${response.status}:`, errorDetails);
			console.error(`[Geolocation] Requested IP was: ${clientIP}`);
			return null;
		}
		
		const data: GeoData = await response.json();
		return data;
	} catch (error) {
		console.error('Failed to get geo data from request:', error);
		return null;
	}
}

