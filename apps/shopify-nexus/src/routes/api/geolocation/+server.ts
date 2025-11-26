import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getUserCountry } from '$lib/utils/geolocation';

export const GET: RequestHandler = async () => {
	const country = await getUserCountry();
	return json({ country });
};

