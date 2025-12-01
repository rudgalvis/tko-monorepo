import { json, type RequestHandler } from '@sveltejs/kit'
import { logger } from '$lib/utils/loggers/logger';

export const POST: RequestHandler = async () => {
	try {
        logger.error('Geolocation failure. All methods have failed')

		return json({ success: true });
	} catch (error) {
		logger.error('Failed to log geolocation event', { error });
		return json({ success: false, error: 'Failed to process log' }, { status: 400 });
	}
};