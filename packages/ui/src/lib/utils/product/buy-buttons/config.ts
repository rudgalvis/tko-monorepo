export const BUY_BUTTONS_CONFIG = {
	selectors: {
		priceValue: '.pdp-price-container .price-ui--value',
		ctaPrice: '.pdp-cta-price',
		preorderButton: '.gPreorderBtnLoaded',
		productForm: 'product-form',
		productFormSubmit: '.product-form__submit',
		footer: '.pdp-cta-footer--content',
		disclaimer: '.pdp-disclaimer',
		paymentOptions: '.gPreorderTopMessageParent',
		productPriceElement: '.pdp-price-container product-price'
	},
	retry: {
		maxAttempts: 10,
		interval: 100
	},
	breakpoints: {
		mobile: 767
	}
} as const;

