import { mainFooter } from '$lib/main-footer.js';
import { mainHead } from '$lib/main-head.js';
import { displayCurrency, marketCurrency } from '$lib/store/currency.js';
import { cartItemToPreorderCartItem } from 'common-utils';
import { getAutomaticDiscount } from './api/rrxtko.api.js';

/* Communication layer */
if (typeof window !== 'undefined') {
	window['UI'] = {
		stores: {
			displayCurrency,
			marketCurrency
		},
		actions: {}
	};

	window['footerScripts'] = mainFooter;
	window['getAutomaticDiscount'] = getAutomaticDiscount;
	window['cartItemToPreorderCartItem'] = cartItemToPreorderCartItem;
}

mainHead();

/* Custom elements */
export { default as CartRecommendationCard } from './custom-elements/cart/CartRecommendationCard.svelte';
export { default as KnittersAccordionItem } from './custom-elements/knitters/KnittersAccordionItem.svelte';
export { default as KnittersAccordion } from './custom-elements/knitters/KnittersAccordion.svelte';
export { default as CurrencySelector } from './custom-elements/common/CurrencySelector.svelte';
export { default as ProductPrice } from './custom-elements/common/ProductPrice.svelte';
export { default as ProductDiscountPercentage } from './custom-elements/common/ProductDiscountPercentage.svelte';
export { default as PreOrderStrip } from './custom-elements/pdp/pre-order/PreOrderStrip.svelte';
export { default as ProductForm } from './custom-elements/pdp/ProductForm.svelte';
export { default as DevMarketDetails } from './custom-elements/dev/DevMarketDetails.svelte';
export { default as CartNote } from './custom-elements/cart/CartNote.svelte';
export { default as ColorSelector } from './custom-elements/pdp/color-selector/ColorSelector.svelte';
export { default as SizeSelector } from './custom-elements/pdp/size-selector/SizeSelector.svelte';

/* Regular exports */
export { getAutomaticDiscount };
