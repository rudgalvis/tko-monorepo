import { FREECURRENCYAPI_KEY } from '$env/static/private'
import { error, json, type RequestHandler } from "@sveltejs/kit";
import { CurrencyRatesApi } from "storefront-api";

export const GET: RequestHandler = async ({params}) => {
    const { base_market } = params

    if(!base_market) throw error(400, { message: 'Base market is required' })

    const currencyRatesApi = new CurrencyRatesApi(FREECURRENCYAPI_KEY)

    const currencies = [
        'EUR',
        'AUD',
        'GBP',
        'USD',
    ]

    try {
        const rates = await currencyRatesApi.getRates(base_market, currencies)

        return json(rates)
    } catch (e) {
        throw error(500, { message: 'Failed fetching currencies. ' + e})
    }
}