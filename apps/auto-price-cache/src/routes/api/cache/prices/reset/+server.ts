import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getCacheService } from '$lib/cache-instance';

/**
 * POST /api/cache/prices/reset
 * Reset the entire caching process and clear all cached data
 */
export const POST: RequestHandler = async () => {
	try {
		const cacheService = getCacheService();

		// Check if running
		if (cacheService.isProcessRunning()) {
			return json(
				{
					error: 'Cannot reset while process is running. Stop it first.'
				},
				{ status: 409 }
			);
		}

		cacheService.reset();

		return json({
			message: 'Cache process reset successfully'
		});
	} catch (error) {
		console.error('Error resetting cache process:', error);
		return json(
			{
				error: error instanceof Error ? error.message : 'Failed to reset cache process'
			},
			{ status: 500 }
		);
	}
};

