import { cartItemToPreorderCartItem } from 'common-utils';

export const createCartDrawerFooterRivet = () => {
	const FOOTER_SELECTOR_ID = 'total-price-drawer-footer';
	const e = document.getElementById(FOOTER_SELECTOR_ID);

	// Create your data model
	const model = {
		total: 0,
		totalOriginal: 0,
		discounts: 0,
		items: 0,
		updateTotals: function () {
			if (!window.CartJS) return;

			let result = 0;

			window.CartJS.cart.items?.forEach((item) => {
				const { pre_oder_price, final_price } = cartItemToPreorderCartItem(item);

				if (!pre_oder_price || !pre_oder_price.checkout_price)
					return (result += final_price);

				result += pre_oder_price.checkout_price;
			});

			this.total = result;
//			this.totalOriginal = result + window.CartJS.cart.total_discount;
			this.totalOriginal =  window.CartJS.cart.original_total_price;
			this.discounts = window.CartJS.cart.total_discount;
			this.items = window.CartJS.cart.item_count;
		}
	};

	// Bind the model to the view
	window.rivets.bind(e, model);

	document.addEventListener('cart:fix-1-applied', () => {
		model.updateTotals();
	})

	model.updateTotals();
};
