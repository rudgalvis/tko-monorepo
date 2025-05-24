<svelte:options customElement={{ tag: 'product-price', shadow: 'none' }} />

<script lang="ts">
	import type { PriceStrCouple } from '$lib/types/PriceStrCouple.js';
	import { calculateDiscountPercentage } from '$lib/utils/price/calculate-discount-percentage.js';
	import { normalizePriceInput } from '$lib/utils/price/normalize-price-input.js';
	import { fade } from 'svelte/transition';
	import { currencyRates, displayCurrency, marketCurrency } from '$lib/store/currency.js';
	import { removeNonComponentChildren } from '$lib/utils/dom/remove-non-component-children.js';
	import {
		parseCurrencyString,
		subtractCurrencyStrings
	} from '$lib/utils/formatters/price-formatter.js';
	import { NexusApi } from 'storefront-api';

	const {
		theme = 'big',
		price: inputPrice,
		compared_at: inputComparedAt,
		iso_code: market,
		discount_position = 'inline',
		variant_id,
		DEV_currency,
		DEV_market
	} = $props<{
		price: string; // 10€, €10
		compared_at?: string; // 10€, €10, nodiscount
		iso_code?: string; // LT, AU, ...
		variant_id?: string; // numeric
		theme?: 'small' | 'small-vivid' | 'medium' | 'big';
		discount_position?: 'inline' | 'newline' | 'newlineOnMobile' | 'hidden';
		DEV_currency?: 'EUR' | 'AUD' | 'GBP' | 'USD'; // For storybook usage
		DEV_market?: 'EUR' | 'AUD' | 'GBP' | 'USD'; // For storybook usage
	}>();

	const nexusApi = new NexusApi();

	const emptyPrice = {
		price: '-1',
		comparedAt: undefined
	};

	const normalizedPrice: PriceStrCouple = $derived.by(() =>
		normalizePriceInput(inputPrice, inputComparedAt)
	);
	const autoDiscountedPrice = $state<PriceStrCouple>(emptyPrice);
	const finalPrice = $state<PriceStrCouple>(emptyPrice);

	let discountPercentage = $derived.by(() => calculateDiscountPercentage(finalPrice));

	// DEV ONLY
	$effect(() => {
		if (DEV_currency) displayCurrency.set(DEV_currency);
		if (DEV_market) marketCurrency.set(DEV_market);
	});

	// Apply automatic discount if possible
	$effect(() => {
		// Take and hold the latest normalized values even if a discount would not be applied
		autoDiscountedPrice.price = normalizedPrice.price;
		autoDiscountedPrice.comparedAt = normalizedPrice.comparedAt;

		if (!market) return;
		if (!variant_id) return;
		if (!normalizedPrice.price) return;
		if (normalizedPrice.comparedAt) return; // Only check if no regular compared at is present

		try {
			calculateAutomaticDiscount({ ...normalizedPrice }).then(({ price, comparedAt }) => {
				autoDiscountedPrice.price = price;
				autoDiscountedPrice.comparedAt = comparedAt;
			});
		} catch (e) {
			console.error(e);
		}
	});

	// Apply display currency changes
	$effect(() => {
		if (!$displayCurrency) return;
		if (!$currencyRates) return;

		// Create a formatter for the display currency
		const formatter = new Intl.NumberFormat(undefined, {
			style: 'currency',
			currency: $displayCurrency, // 'EUR', 'USD', etc.
			currencySign: 'standard',
			currencyDisplay: 'narrowSymbol',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		});

		// Format the price based on the selected display currency
		const { value: price } = parseCurrencyString(autoDiscountedPrice.price);
		finalPrice.price = formatter.format(price);

		// Format compared at price if it exists
		if (autoDiscountedPrice.comparedAt) {
			const { value: comparedAt } = parseCurrencyString(autoDiscountedPrice.comparedAt);
			finalPrice.comparedAt = formatter.format(comparedAt);
		} else {
			finalPrice.comparedAt = undefined;
		}

		// No conversion needed if currencies match
		if ($marketCurrency === $displayCurrency) return;

		// Get a conversion rate and apply to prices
		const rate = $currencyRates[$displayCurrency];

		// Apply conversion to price
		finalPrice.price = formatter.format(Math.round(price * rate));

		// Apply conversion to compare at price if it exists
		if (autoDiscountedPrice.comparedAt) {
			const { value: comparedAt } = parseCurrencyString(autoDiscountedPrice.comparedAt);
			finalPrice.comparedAt = formatter.format(Math.round(comparedAt * rate));
		} else {
			finalPrice.comparedAt = undefined;
		}
	});

	const calculateAutomaticDiscount = async ({
		price: orgPrice
	}: PriceStrCouple): Promise<PriceStrCouple> => {
		if (!market) throw new Error('market is required');
		if (!variant_id) throw new Error('market is required');

		const { amount } = await nexusApi.getAutomaticDiscount(market, +variant_id);

		if (!amount || amount === 0)
			return {
				price: orgPrice,
				comparedAt: undefined
			};

		const { formatted: newPrice } = subtractCurrencyStrings(orgPrice, amount);

		return {
			price: newPrice,
			comparedAt: orgPrice
		};
	};
</script>

{#if $marketCurrency && finalPrice.price !== '-1'}
	<div
		in:fade={{ delay: 350, duration: 50 }}
		use:removeNonComponentChildren
		class="product-price"
		class:product-price---has-discount={finalPrice.comparedAt}
		class:product-price---small={theme === 'small' || theme === 'small-vivid'}
		class:product-price---vivid={theme === 'small-vivid'}
		class:product-price---medium={theme === 'medium'}
		class:product-price---big={theme === 'big'}
		class:product-price---discount-inline={discount_position === 'inline'}
		class:product-price---discount-newline={discount_position === 'newline'}
		class:product-price---discount-newline-on-mobile={discount_position === 'newlineOnMobile'}
	>
		{#if finalPrice.comparedAt}
			<div class="product-price--compared-at">
				{finalPrice.comparedAt}
			</div>
		{/if}
		<div class="product-price--price">{finalPrice.price}</div>

		{#if discountPercentage && discount_position !== 'hidden'}
			<div class="product-price--discount">
				-{discountPercentage}% off
			</div>
		{/if}
	</div>
{/if}

<style lang="scss">
	@mixin newLineDiscount {
		flex-wrap: wrap;

		@media screen and (max-width: 1024px) {
			gap: 0 8px;
		}

		.product-price--discount {
			width: 100%;

			&:before {
				display: none;
			}
		}
	}

	@mixin inlineDiscount {
		.product-price--discount {
			&:before {
				display: block;
				margin-right: 8px;
				height: 60%;
				background-color: rgba(0, 0, 0, 0.1);
			}
		}
	}

	@mixin bigStyles {
		gap: 0 16px;
		font-size: 42px;
		color: #000;

		@media screen and (max-width: 1024px) {
			font-size: 20px;
			gap: 4px 8px;
		}

		&.product-price---discount-inline {
			@include inlineDiscount;

			.product-price--discount:before {
				margin-right: 12px;
			}
		}

		&.product-price---discount-newline {
			@include newLineDiscount;

			@media screen and (max-width: 1024px) {
				.product-price--discount {
					margin-top: -3px;
					font-size: 70%;
				}
			}
		}

		&.product-price---discount-newline-on-mobile {
			@include inlineDiscount;

			.product-price--discount:before {
				margin-right: 12px;
			}

			@media screen and (max-width: 1024px) {
				@include newLineDiscount;

				.product-price--discount {
					margin-top: -3px;
					font-size: 70%;
				}
			}
		}
	}

	.product-price {
		font-family: 'Monument', sans-serif;
		display: flex;

		&---small {
			gap: 0 8px;
			font-size: 16px;
			letter-spacing: -0.22px;
			color: rgb(124, 124, 124);
			justify-content: center;

			&.product-price---vivid {
				color: rgb(0, 0, 0);
			}

			@media screen and (max-width: 1024px) {
				font-size: 12px;
				gap: 4px;
			}

			&.product-price---discount-inline {
				@include inlineDiscount;
			}

			&.product-price---discount-newline {
				@include newLineDiscount;

				.product-price--discount {
					justify-content: center;
				}
			}

			&.product-price---discount-newline-on-mobile {
				@include inlineDiscount;

				@media screen and (max-width: 1024px) {
					@include newLineDiscount;
					gap: 0 8px;

					.product-price--discount {
						justify-content: center;
					}
				}
			}
		}

		&---medium {
			@include bigStyles();
			font-size: 23px;
		}
		&---big {
			@include bigStyles();
		}

		&---has-discount {
			.product-price--price {
				color: rgb(210, 25, 16);
			}
		}

		&--compared-at {
			text-decoration: line-through;
		}

		&--discount {
			color: rgb(210, 25, 16);
			display: flex;
			align-items: center;

			&:before {
				content: '';
				background-color: rgba(0, 0, 0, 0.1);
				width: 1px;
			}
		}
	}
</style>
