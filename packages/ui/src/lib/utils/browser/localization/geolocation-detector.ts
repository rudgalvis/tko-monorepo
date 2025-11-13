/**
 * Geolocation Detector
 * 
 * Detects user's country based on their IP address using multiple fallback methods:
 * 1. ipapi.co (1000 requests/day)
 * 2. ipwho.is (10k requests/month, final fallback)
 * 3. ip-api.com (45 req/min, ~65k/day) // Needs to be passed through our backend
 *
 * Our capacity (limited only): 66,133/day, 1,984,000/month
 * 
 * Designed to handle 150k requests/month with 20k/day peaks
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
 * Main function to detect user's country
 * Tries multiple methods in sequence until one succeeds
 * 
 * @returns ISO 3166-1 alpha-2 country code (e.g., 'US', 'GB', 'LT') or null if detection fails
 */
export const detectUserCountry = async (): Promise<string | null> => {
	frontendLogger.debug('Geolocation: Starting country detection...');

	// Try methods in sequence - ordered by reliability and capacity
	const methods = [
		getCountryFromIpWho,         // 10k req/month (final fallback)
        getCountryFromIpApi,           // 1000 req/day
		getCountryFromIpApiProxied,        // 45 req/min (~65k/day)
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

