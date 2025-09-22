/* This runs on every page load */
import { createCartDrawerFooterRivet } from '$lib/utils/fixes/create-cart-drawer-footer-rivet.js';

export const mainFooter = () => {
	createCartDrawerFooterRivet()
}