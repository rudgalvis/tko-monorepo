/* This runs on every page load */
import { cacheSweeper } from '$lib/utils/browser/cache-sweeper.js';
import { enforceCartCalculationConsistency } from '$lib/utils/fixes/enforceCartCalculationConsistency.js';
import { initiateCurrencies } from '$lib/utils/initiators/initiate-currencies.js';

export const mainHead = () => {
	cacheSweeper()
	initiateCurrencies()
	enforceCartCalculationConsistency()
}