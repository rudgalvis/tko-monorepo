import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getCacheService } from '$lib/cache-instance';

/**
 * POST /api/cache/prices/start
 * Start or resume the price caching process
 */
export const POST: RequestHandler = async () => {
	try {
		const cacheService = getCacheService();

		// Check if already running
		if (cacheService.isProcessRunning()) {
			return json(
				{
					error: 'Process is already running'
				},
				{ status: 409 }
			);
		}

		// Start the process (it will auto-resume if paused)
		// Run in background without awaiting
		cacheService.start().catch((error) => {
			console.error('Cache process error:', error);
		});

		// Return immediately
		return json({
			message: 'Cache process started successfully',
			state: cacheService.getCurrentState()
		});
	} catch (error) {
		console.error('Error starting cache process:', error);
		return json(
			{
				error: error instanceof Error ? error.message : 'Failed to start cache process'
			},
			{ status: 500 }
		);
	}
};

