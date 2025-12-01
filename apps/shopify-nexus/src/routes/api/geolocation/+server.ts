import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getUserCountryFromRequest } from '$lib/modules/geolocating/geolocation';

export const GET: RequestHandler = async (event) => {
	const country = await getUserCountryFromRequest(event);

	return json({ country });
};

