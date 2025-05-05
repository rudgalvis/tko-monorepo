import { error, json, type RequestHandler } from '@sveltejs/kit';
import { getAutomaticDiscount } from 'component-lib';

const handler: RequestHandler = async ({ params }) => {
	const { variant_id, iso_country } = params;

	if (!variant_id) throw error(400, { message: 'Variant ID is required' });
	if (!iso_country) throw error(400, { message: 'Country code is required' });

	return json({ amount: await getAutomaticDiscount(iso_country, +variant_id) });
};

export const POST: RequestHandler = handler;
export const GET: RequestHandler = handler;
