/* This runs on every page load */
import { createCartDrawerFooterRivet } from '$lib/utils/fixes/create-cart-drawer-footer-rivet.js';
import { isPage, Page } from './utils/context/is-page.js';
import { buyButtonsInitialize } from './modules/product-page/buy-buttons/index.js';

export const mainFooter = () => {
	createCartDrawerFooterRivet()

	if (isPage(Page.PDP)) buyButtonsInitialize()
}