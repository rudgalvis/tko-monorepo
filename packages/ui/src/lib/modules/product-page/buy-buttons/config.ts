export const BUY_BUTTONS_CONFIG = {
	debug: {
		enabled: false,
	},
	selectors: {
		priceValue: '.pdp-price-container .price-ui--value',
		ctaPrice: '.pdp-cta-price',
		preorderButton: '.gPreorderBtnLoaded',
		productForm: 'product-form',
		productFormSubmit: '.product-form__submit',
		productFormButtons: '.product-form__buttons',
		footer: '.pdp-cta-footer--content',
		disclaimer: '.pdp-disclaimer',
		paymentOptions: '.gPreorderTopMessageParent',
		productPriceElement: '.pdp-price-container product-price',
		skeletonWave: '.skeleton-wave',
		globoBackInStock: '#Globo-Back-In-Stock',
		sellingPlanOptions: '.gPreorderSellingPlanOptions', 
		sellingPlanParent: '.gPreorderSellingPlanParent',
		observerContainer: '.product__info-container',
	},
	retry: {
		maxAttempts: 100,
		interval: 150
	},
	breakpoints: {
		mobile: 767
	}
} as const;

