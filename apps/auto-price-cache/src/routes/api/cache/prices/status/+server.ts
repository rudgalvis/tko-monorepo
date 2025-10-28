import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getCacheService } from '$lib/cache-instance';

/**
 * GET /api/cache/prices/status
 * Get the current status of the caching process
 */
export const GET: RequestHandler = async () => {
	try {
		const cacheService = getCacheService();
		const status = cacheService.getStatus();

		return json(status);
	} catch (error) {
		console.error('Error getting cache status:', error);
		return json(
			{
				error: error instanceof Error ? error.message : 'Failed to get cache status'
			},
			{ status: 500 }
		);
	}
};

