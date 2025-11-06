/**
 * Geolocation Detector
 * 
 * Detects user's country based on their IP address using multiple fallback methods:
 * 1. Cloudflare headers (if site is behind Cloudflare)
 * 2. ipapi.co free API (no key required, 1000 requests/day)
 * 3. ipify + ip-api.com combination as final fallback
 * 
 * Returns ISO 3166-1 alpha-2 country code (e.g., 'US', 'GB', 'LT')
 */

import { frontendLogger } from "../../loggers/frontend-logger.js";

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
 * Method 2: Use ip-api.com as fallback
 * Free tier: 45 requests/minute, no API key required
 */
const getCountryFromIpApiCom = async (): Promise<string | null> => {
	try {
		const controller = new AbortController();
		const timeout = setTimeout(() => controller.abort(), 5000);

		const response = await fetch('https://ip-api.com/json/', {
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
 * Main function to detect user's country
 * Tries multiple methods in sequence until one succeeds
 * 
 * @returns ISO 3166-1 alpha-2 country code (e.g., 'US', 'GB', 'LT') or null if detection fails
 */
export const detectUserCountry = async (): Promise<string | null> => {
	frontendLogger.debug('Geolocation: Starting country detection...');

	// Try methods in sequence
	const methods = [
		getCountryFromIpApi,
		getCountryFromIpApiCom
	];

	for (const method of methods) {
		try {
			const country = await method();
			if (country) {
				return country;
			}
		} catch (error) {
			// Continue to next method
			frontendLogger.debug('Geolocation: Method failed, trying next...', error);
		}
	}

	frontendLogger.warn('Geolocation: All detection methods failed');
	return null;
};

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

