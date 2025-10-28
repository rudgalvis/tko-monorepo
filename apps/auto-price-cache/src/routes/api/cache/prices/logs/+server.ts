import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getCacheService } from '$lib/cache-instance';

/**
 * GET /api/cache/prices/logs
 * Retrieve fetch logs with pagination
 */
export const GET: RequestHandler = async ({ url }) => {
	try {
		const cacheService = getCacheService();
		const fetchLogService = cacheService.getFetchLogService();

		// Get query parameters
		const page = parseInt(url.searchParams.get('page') || '1');
		const pageSize = parseInt(url.searchParams.get('pageSize') || '100');
		const limit = url.searchParams.get('limit') ? parseInt(url.searchParams.get('limit')!) : undefined;

		// If limit is specified, return limited logs without pagination
		if (limit) {
			const logs = fetchLogService.getLogs(limit);
			const stats = fetchLogService.getStats();
			const metadata = fetchLogService.getRunMetadata();

			return json({
				logs,
				stats,
				metadata,
				total: logs.length
			});
		}

		// Otherwise, return paginated logs
		const result = fetchLogService.getLogsPaginated(page, pageSize);
		const stats = fetchLogService.getStats();
		const metadata = fetchLogService.getRunMetadata();

		return json({
			...result,
			stats,
			metadata
		});
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'Failed to retrieve fetch logs';
		return json(
			{
				error: errorMessage
			},
			{ status: 500 }
		);
	}
};

/**
 * DELETE /api/cache/prices/logs
 * Clear all fetch logs
 */
export const DELETE: RequestHandler = async () => {
	try {
		const cacheService = getCacheService();
		const fetchLogService = cacheService.getFetchLogService();

		fetchLogService.clearLogs();

		return json({
			success: true,
			message: 'Fetch logs cleared successfully'
		});
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'Failed to clear fetch logs';
		return json(
			{
				error: errorMessage
			},
			{ status: 500 }
		);
	}
};

