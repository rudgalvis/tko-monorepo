import { json, type RequestHandler } from '@sveltejs/kit'
import { logger } from '$lib/utils/loggers/logger';

interface GeolocationLogData {
	method: string; // nexus, ipapicom, ...
	success: boolean;
	country?: string | null;
	error?: string;
	timestamp?: string;
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data: GeolocationLogData = await request.json();

		const logMessage = {
			method: data.method || 'unknown',
			success: data.success,
			country: data.country || null,
			error: data.error || null,
			timestamp: data.timestamp || new Date().toISOString(),
		};

		if (data.success) {
			logger.info('Geolocation detection succeeded', logMessage);
		} else {
			logger.warn('Geolocation detection failed', logMessage);
		}

		return json({ success: true });
	} catch (error) {
		logger.error('Failed to log geolocation event', { error });
		return json({ success: false, error: 'Failed to process log' }, { status: 400 });
	}
};