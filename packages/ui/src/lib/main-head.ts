/* This runs on every page load */
import { cacheSweeper } from '$lib/utils/browser/cache-sweeper.js';
import { enforceCartCalculationConsistency } from '$lib/utils/fixes/enforceCartCalculationConsistency.js';
import { initiateCurrencies } from '$lib/utils/initiators/initiate-currencies.js';
import { PreorderStateManager } from '$lib/utils/product/buy-buttons/preorder-state.js';



export const mainHead = () => {
	cacheSweeper()
	initiateCurrencies()
	enforceCartCalculationConsistency()
	PreorderStateManager.getInstance().init()
}