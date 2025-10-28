import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getCacheService } from '$lib/cache-instance';

/**
 * POST /api/cache/prices/stop
 * Stop the price caching process
 */
export const POST: RequestHandler = async () => {
	try {
		const cacheService = getCacheService();

		cacheService.stop();

		return json({
			message: 'Stop signal sent to cache process',
			state: cacheService.getCurrentState()
		});
	} catch (error) {
		console.error('Error stopping cache process:', error);
		return json(
			{
				error: error instanceof Error ? error.message : 'Failed to stop cache process'
			},
			{ status: 500 }
		);
	}
};

