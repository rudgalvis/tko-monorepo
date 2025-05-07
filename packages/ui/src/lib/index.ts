import { displayCurrency, marketCurrency } from '$lib/store/currency.js';
import { getAutomaticDiscount } from './api/rrxtko.api.js';

/* Communication layer */
if (typeof window !== 'undefined') {
	const UI = {
		stores: {
			displayCurrency,
			marketCurrency
		}
	};

	//@ts-ignore
	window['getAutomaticDiscount'] = getAutomaticDiscount;

	window['UI'] = UI;
}

/* Custom elements */
export { default as CartRecommendationCard } from './custom-elements/cart/CartRecommendationCard.svelte';
export { default as KnittersAccordionItem } from './custom-elements/knitters/KnittersAccordionItem.svelte';
export { default as KnittersAccordion } from './custom-elements/knitters/KnittersAccordion.svelte';
export { default as CurrencySelector } from './custom-elements/common/CurrencySelector.svelte';
export { default as ProductPrice } from './custom-elements/common/ProductPrice.svelte';
export { default as ProductDiscountPercentage } from './custom-elements/common/ProductDiscountPercentage.svelte';
export { default as PreOrderStrip } from './custom-elements/pdp/pre-order/PreOrderStrip.svelte';

/* Regular exports */
export { getAutomaticDiscount };
