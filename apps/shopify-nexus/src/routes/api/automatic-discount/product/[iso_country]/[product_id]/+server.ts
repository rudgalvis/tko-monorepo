import { error, json, type RequestHandler } from '@sveltejs/kit'
import { StorefrontApi } from 'storefront-api'

const handler: RequestHandler = async ({ params }) => {
	const { product_id, iso_country } = params

	if (!product_id) throw error(400, { message: 'Product ID is required' })
	if (!iso_country) throw error(400, { message: 'Country code is required' })

	const storefrontApi = new StorefrontApi()

	try {
		return json({
			amount: await storefrontApi.getAutomaticDiscountForProduct(iso_country, +product_id),
		})
	} catch (e: unknown) {
		if (e instanceof Error) {
			if (/merchandise .*? does not exist/.test(e.message)) {
				throw error(404, { message: 'Merchandise not found' })
			}
		}
	}

	throw error(500, { message: 'Internal error...' })
}

export const POST: RequestHandler = handler
export const GET: RequestHandler = handler
