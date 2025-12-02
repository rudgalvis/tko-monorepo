import { PUBLIC_NEXUS_BASE_URL } from '$env/static/public';

// Get base URL from environment variable, fallback to relative path for production
const getBaseUrl = (): string => {
	const envUrl = PUBLIC_NEXUS_BASE_URL;
	if (envUrl) {
		return envUrl.endsWith('/api') ? envUrl : `${envUrl}/api`;
	}
	// Fallback to relative path (works in production when served from same domain)
	return '/api';
};

const BASE_URL = getBaseUrl();

const API_ROUTES = {
	GET_AUTOMATIC_DISCOUNT: (isoCode: string, variantId: number) =>
		`automatic-discount/${isoCode}/${variantId}`,
	GET_GEOLOCATION: () => 'geolocation',
	LOG_GEOLOCATION: () => 'logs/geolocation/attempt',
	LOG_GEOLOCATION_FAILURE: () => 'logs/geolocation/failure'
};

export const getAutomaticDiscount = async (isoCode: string, variantId: number) => {
	const response = await fetch(
		`${BASE_URL}/${API_ROUTES.GET_AUTOMATIC_DISCOUNT(isoCode, variantId)}`,
		{ method: 'GET' }
	);

	try {
		return await response.json();
	} catch (e) {
		console.error(e);
	}
};


/**
 * Log geolocation detection attempt to Nexus API
 * @param method - The detection method used (e.g., 'nexus', 'ipapi.co', 'ipwho.is')
 * @param success - Whether the detection was successful
 * @param country - Detected country code (if successful)
 * @param error - Error message (if failed)
 */
export const logGeolocationAttempt = async (
	method: string,
	success: boolean,
	country?: string | null,
	error?: string
): Promise<void> => {
	try {
		await fetch(`${BASE_URL}/${API_ROUTES.LOG_GEOLOCATION()}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				method,
				success,
				country: country || null,
				error: error || null,
				timestamp: new Date().toISOString()
			})
		});
	} catch (err) {
		// Silently fail logging - don't break the main flow
		console.debug('Failed to log geolocation attempt:', err);
	}
};

/**
 * Call fallback geolocation endpoint when all client-side methods fail
 * Attempts server-side IP detection as a last resort
 * @returns Country code if successful, null otherwise
 */
export const logGeolocationFailure = async (): Promise<string | null> => {
	try {
		const response = await fetch(`${BASE_URL}/${API_ROUTES.LOG_GEOLOCATION_FAILURE()}`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json'
			}
		});

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}`);
		}

		const data = await response.json();
		return data.success ? data.country || null : null;
	} catch (error) {
		console.error('Failed to get geolocation fallback:', error);
		return null;
	}
};
