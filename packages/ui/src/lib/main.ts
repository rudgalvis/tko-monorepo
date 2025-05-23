/* This runs on every page load */
import { cacheSweeper } from '$lib/utils/browser/cache-sweeper.js';
import { initiateCurrencies } from '$lib/utils/initiators/initiate-currencies.js';

export const main = () => {
	cacheSweeper()
	initiateCurrencies()
}