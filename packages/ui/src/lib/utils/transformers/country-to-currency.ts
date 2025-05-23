import type { AvailableMarketsCountryCode } from '$lib/types/AvailableMarketsCountryCode.js';
import availableMarkets from '$lib/data/available-markets.json' with { type: 'json' };

export const countryToCurrency = (countryCode: AvailableMarketsCountryCode) => {
	const market = availableMarkets.find(e => e.country.toLowerCase() === countryCode.toLowerCase())
	if(!market) return 'EUR' // Fallback to EUR

	return market.currency
}