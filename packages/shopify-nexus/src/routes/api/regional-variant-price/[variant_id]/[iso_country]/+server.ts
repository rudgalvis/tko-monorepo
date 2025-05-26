import { error, json, type RequestHandler } from '@sveltejs/kit'
import { StorefrontApi } from 'storefront-api'

export const GET: RequestHandler = async ({ params }) => {
	const { variant_id, iso_country } = params

	if (!variant_id) throw error(400, { message: 'Variant ID is required' })
	if (!iso_country) throw error(400, { message: 'Country code is required' })


	const storefrontApi = new StorefrontApi()

	try {
		const price = await storefrontApi.getFinalVariantPrice(iso_country, +variant_id)

		return json(price)
	} catch (e) {
		if(e instanceof Error) {
			if(e.message.toLowerCase().includes('variant not found')) throw error(404, { message: 'Variant not found' })
			if(e.message.toLowerCase().includes('variant is not available for sale')) throw error(422, { message: 'Variant is not available for purchase' })
			if(e.message.toLowerCase().includes('failed to create cart')) throw error(422, { message: 'Something went wrong. Check if country code is correct.' })
		}

		throw error(500, { message: 'Failed getting variant price. ' + e })
	}
}