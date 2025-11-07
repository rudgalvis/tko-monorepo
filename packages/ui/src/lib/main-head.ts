/* This runs on every page load */
import { cacheSweeper } from '$lib/utils/browser/cache/cache-sweeper.js';
import { enforceCartCalculationConsistency } from '$lib/utils/fixes/enforceCartCalculationConsistency.js';
import { initiateCurrencies } from '$lib/utils/initiators/initiate-currencies.js';
import { initPreorderListener } from '$lib/modules/product-page/buy-buttons/index.js';
import { geolocationMarketEnforcer } from './utils/browser/localization/localization.js';

export const mainHead = async () => {
	cacheSweeper()
	await geolocationMarketEnforcer()
	initiateCurrencies()
	enforceCartCalculationConsistency()
	initPreorderListener()
}