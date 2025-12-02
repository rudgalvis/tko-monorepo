/**
 * Geolocation Detector
 * 
 * Detects user's country based on their IP address using multiple fallback methods:
 * 1. Shopify Nexus API (server-side IP detection via Cloudflare Worker)
 * 2. ipapi.co (1000 requests/day)
 * 3. ipwho.is (10k requests/month, final fallback)
 * 4. ip-api.com (45 req/min, ~65k/day) // Needs to be passed through our backend
 *
 * Our capacity (limited only): 66,133/day, 1,984,000/month
 * 
 * Designed to handle 150k requests/month with 20k/day peaks
 * Returns ISO 3166-1 alpha-2 country code (e.g., 'US', 'GB', 'LT')
 */

import { frontendLogger } from "../../loggers/frontend-logger.js";
import { getGeolocation } from "../../../api/cloudflare.api.js";
import { logGeolocationAttempt, logGeolocationFailure } from "../../../api/rrxtko.api.js";

/**
 * Method 1: Use ipapi.co free API
 * Free tier: 1000 requests/day, no API key required
 */
const getCountryFromIpApi = async (): Promise<string | null> => {
	try {
		const controller = new AbortController();
		const timeout = setTimeout(() => controller.abort(), 5000);

		const response = await fetch('https://ipapi.co/json/', {
			method: 'GET',
			headers: {
				'Accept': 'application/json'
			},
			signal: controller.signal
		});

		clearTimeout(timeout);

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}`);
		}

		const data = await response.json();
		
		if (data.country_code) {
			frontendLogger.debug(`Geolocation: Detected from ipapi.co: ${data.country_code}`);
			return data.country_code;
		}

		return null;
	} catch (error) {
		if (error instanceof Error && error.name === 'AbortError') {
			frontendLogger.debug('Geolocation: ipapi.co method timed out');
		} else {
			frontendLogger.debug('Geolocation: ipapi.co method failed', error);
		}
		return null;
	}
};

/**
 * Method 2: Use ip-api.com as primary fallback
 * Free tier: 45 requests/minute, no API key required
 */
const getCountryFromIpApiProxied = async (): Promise<string | null> => {
	try {
		const controller = new AbortController();
		const timeout = setTimeout(() => controller.abort(), 5000);

		frontendLogger.debug('http://ip-api.com/json/')

		await new Promise((res) => setTimeout(res, 1000))

		const response = await fetch('http://ip-api.com/json/', {
			method: 'GET',
			signal: controller.signal
		});

		clearTimeout(timeout);

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}`);
		}

		const data = await response.json();
		
		if (data.status === 'success' && data.countryCode) {
			frontendLogger.debug(`Geolocation: Detected from ip-api.com: ${data.countryCode}`);
			return data.countryCode;
		}

		return null;
	} catch (error) {
		if (error instanceof Error && error.name === 'AbortError') {
			frontendLogger.debug('Geolocation: ip-api.com method timed out');
		} else {
			frontendLogger.debug('Geolocation: ip-api.com method failed', error);
		}
		return null;
	}
};

/**
 * Method 5: Use ipwho.is as final fallback
 * Free tier: 10,000 requests/month, no API key required
 */
const getCountryFromIpWho = async (): Promise<string | null> => {
	try {
		const controller = new AbortController();
		const timeout = setTimeout(() => controller.abort(), 5000);

		const response = await fetch('https://ipwho.is/', {
			method: 'GET',
			headers: {
				'Accept': 'application/json'
			},
			signal: controller.signal
		});

		clearTimeout(timeout);

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}`);
		}

		const data = await response.json();
		
		if (data.success && data.country_code) {
			frontendLogger.debug(`Geolocation: Detected from ipwho.is: ${data.country_code}`);
			return data.country_code;
		}

		return null;
	} catch (error) {
		if (error instanceof Error && error.name === 'AbortError') {
			frontendLogger.debug('Geolocation: ipwho.is method timed out');
		} else {
			frontendLogger.debug('Geolocation: ipwho.is method failed', error);
		}
		return null;
	}
};


/**
 * Method 0: Use Shopify Nexus API (server-side IP detection)
 * Uses Cloudflare Worker to detect client IP from server request
 * This is the preferred method as it uses the server's IP detection capabilities
 * Note: Logging is handled centrally in detectUserCountry()
 */
const getCountryFromNexus = async (): Promise<string | null> => {
	try {
		const controller = new AbortController();
		const timeout = setTimeout(() => controller.abort(), 5000);

		const country = await getGeolocation(controller.signal);

		clearTimeout(timeout);

		if (country) {
			frontendLogger.debug(`Geolocation: Detected from Nexus API: ${country}`);
			return country;
		}

		return null;
	} catch (error) {
		if (error instanceof Error && error.name === 'AbortError') {
			frontendLogger.debug('Geolocation: Nexus API method timed out');
		} else {
			frontendLogger.debug('Geolocation: Nexus API method failed', error);
		}
		throw error; // Re-throw so detectUserCountry can handle logging
	}
};

/**
 * Main function to detect user's country
 * Tries multiple methods in sequence until one succeeds
 * 
 * @returns ISO 3166-1 alpha-2 country code (e.g., 'US', 'GB', 'LT') or null if detection fails
 */
export const detectUserCountry = async (): Promise<string | null> => {
	frontendLogger.debug('Geolocation: Starting country detection...');

	// Try methods in sequence - ordered by reliability and capacity
	// Each entry: [method function, method name for logging]
	const methods: Array<[() => Promise<string | null>, string]> = [
		[getGeolocation, 'cloudflare-worker'],				   // Unlimited, our own w/ cloudflare
		[getCountryFromIpWho, 'ipwho.is'],           // 10k req/month (final fallback)
		[getCountryFromIpApi, 'ipapi.co'],           // 1000 req/day
		[getCountryFromIpApiProxied, 'ip-api.com'],    // 45 req/min (~65k/day)
		[getCountryFromNexus, 'nexus'],           // Uses ipapi, but from server other IP addr
	];

	for (const [method, methodName] of methods) {
		try {
			const country = await method();
			if (country) {
				// Log successful detection to Nexus
				await logGeolocationAttempt(methodName, true, country);
				frontendLogger.debug(`Geolocation: Successfully detected from ${methodName}: ${country}`);
				return country;
			}
			// Log failed detection (no country returned)
			await logGeolocationAttempt(methodName, false, null, 'No country returned');
		} catch (error) {
			// Log failed detection with error
			const errorMessage = error instanceof Error ? error.message : 'Unknown error';
			await logGeolocationAttempt(methodName, false, null, errorMessage);
			frontendLogger.debug(`Geolocation: Method ${methodName} failed, trying next...`, error);
		}
	}

	// Log overall failure (all methods failed)
	frontendLogger.warn('Geolocation: All detection methods failed');
	await logGeolocationFailure();

	return null;
};

window['detectUserCountry'] = detectUserCountry

// Expose for development
if (typeof window !== 'undefined') {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	(window as any).detectUserCountry = detectUserCountry;
}

/**
 * Normalize country code to uppercase
 * Returns the detected country as-is, letting Shopify handle any unsupported countries
 * 
 * @param detectedCountry - ISO country code from geolocation
 * @returns Uppercase country code
 */
export const normalizeCountryCode = (
	detectedCountry: string
): string => {
	return detectedCountry.toUpperCase();
};

