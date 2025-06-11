import availableMarkets from '$lib/data/available-markets.json' with { type: 'json' };
import type { AvailableMarketsCurrency } from "$lib/types/AvailableMarketsCurrency.js";

export const currencyToCountry = (currency: AvailableMarketsCurrency) => {
	const market = availableMarkets.find(e => e.currency.toLowerCase() === currency.toLowerCase())
	if(!market) return 'LT' // Fallback to LT

	return market.country
}