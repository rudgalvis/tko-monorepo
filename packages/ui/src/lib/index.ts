
import { displayCurrency, marketCurrency } from '$lib/store/currency.js';
import { getAutomaticDiscount } from './api/rrxtko.api.js';
import { main } from '$lib/main.js';

/* Communication layer */
if (typeof window !== 'undefined') {
	window['UI'] = {
		stores: {
			displayCurrency,
			marketCurrency
		},
		actions: {}
	};

	window['getAutomaticDiscount'] = getAutomaticDiscount;
}

main()

/* Custom elements */
export { default as CartRecommendationCard } from './custom-elements/cart/CartRecommendationCard.svelte';
export { default as KnittersAccordionItem } from './custom-elements/knitters/KnittersAccordionItem.svelte';
export { default as KnittersAccordion } from './custom-elements/knitters/KnittersAccordion.svelte';
export { default as CurrencySelector } from './custom-elements/common/CurrencySelector.svelte';
export { default as ProductPrice } from './custom-elements/common/ProductPrice.svelte';
export { default as ProductDiscountPercentage } from './custom-elements/common/ProductDiscountPercentage.svelte';
export { default as PreOrderStrip } from './custom-elements/pdp/pre-order/PreOrderStrip.svelte';
export { default as DevMarketDetails } from './custom-elements/dev/DevMarketDetails.svelte';

/* Regular exports */
export { getAutomaticDiscount };
