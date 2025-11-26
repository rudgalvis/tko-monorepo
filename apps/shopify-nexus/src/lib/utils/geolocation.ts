const GEO_WORKER_URL = 'https://geo-location.rokas-239.workers.dev';

/**
 * Get user's country code from IP
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

