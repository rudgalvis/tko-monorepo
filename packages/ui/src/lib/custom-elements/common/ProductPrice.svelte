<svelte:options customElement={{ tag: 'product-price', shadow: 'none' }} />

<script lang="ts">
	import { fade } from 'svelte/transition';
	import { currencyRates, displayCurrency, marketCurrency } from '$lib/store/currency.js';
	import { removeNonComponentChildren } from '$lib/utils/dom/remove-non-component-children.js';
	import {
		parseCurrencyString,
		subtractCurrencyStrings
	} from '$lib/utils/formatters/price-formatter.js';
	import { NexusApi } from 'storefront-api';

	type PriceStrCouple = {
		price: string;
		comparedAt?: string;
	};

	const {
		theme = 'big',
		price: inputPrice,
		compared_at: inputComparedAt,
		iso_code: market,
		variant_id,
		DEV_currency,
		DEV_market
	} = $props<{
		price: string; // 10€, €10
		compared_at?: string; // 10€, €10, nodiscount
		iso_code?: string; // LT, AU, ...
		variant_id?: string; // numeric
		theme?: 'small' | 'big';
		DEV_currency: 'EUR' | 'AUD' | 'GBP' | 'USD'; // For storybook usage
		DEV_market: 'EUR' | 'AUD' | 'GBP' | 'USD'; // For storybook usage
	}>();

	const nexusApi = new NexusApi();

	const normalized = $state<PriceStrCouple>({
		price: inputPrice,
		comparedAt: inputComparedAt
	});

	const autoDiscountApplied = $state<PriceStrCouple>({
		price: inputPrice,
		comparedAt: inputPrice
	});

	const final = $state<PriceStrCouple>({
		price: '-1',
		comparedAt: undefined
	});

	// DEV ONLY
	$effect(() => {
		if (DEV_currency) displayCurrency.set(DEV_currency);
		if (DEV_market) marketCurrency.set(DEV_market);
	});

	// Normalize input
	$effect(() => {
		// Step 1: Create temporary values to batch our changes
		// This prevents infinite loop by preparing values before state updates
		let newPrice = inputPrice;
		let newComparedAt = inputComparedAt;

		// Step 2: Normalize 'nodiscount' value coming from legacy code
		if (newComparedAt === 'nodiscount' || !newComparedAt) {
			newComparedAt = undefined;
		}

		// Step 4: Fix faulty input by swapping values
		// (when price is less than compared_at)
		if (newPrice > newComparedAt) {
			[newPrice, newComparedAt] = [newComparedAt, newPrice];
		}

		// Final step: Update state once with all our changes
		normalized.price = newPrice;
		normalized.comparedAt = newComparedAt;
	});

	// Apply automatic discount if possible
	$effect(() => {
		// Hold normalized values even if discount would not be applied
		autoDiscountApplied.price = normalized.price;
		autoDiscountApplied.comparedAt = normalized.comparedAt;

		if (!market) return;
		if (!variant_id) return;
		if (!normalized.price) return;
		if (normalized.comparedAt) return; // Only check if no regular compared at is present

		try {
			calculateAutomaticDiscount({ ...normalized }).then(({ price, comparedAt }) => {
				autoDiscountApplied.price = price;
				autoDiscountApplied.comparedAt = comparedAt;
			});
		} catch (e) {
			console.error(e);
		}
	});

	// Apply display currency changes
	$effect(() => {
		if(!$displayCurrency) return

		// Validate currency rates are available
		if (!$currencyRates) return

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
		const { value: price } = parseCurrencyString(autoDiscountApplied.price);
		final.price = formatter.format(price);

		// Format compared at price if it exists
		if (autoDiscountApplied.comparedAt) {
			const { value: comparedAt } = parseCurrencyString(autoDiscountApplied.comparedAt);
			final.comparedAt = formatter.format(comparedAt);
		}

		// No conversion needed if currencies match
		if ($marketCurrency === $displayCurrency) return;


		// Get a conversion rate and apply to prices
		const rate = $currencyRates[$displayCurrency];

		// Apply conversion to price
		final.price = formatter.format(Math.round(price * rate));

		// Apply conversion to compare at price if it exists
		if (autoDiscountApplied.comparedAt) {
			const { value: comparedAt } = parseCurrencyString(autoDiscountApplied.comparedAt);
			final.comparedAt = formatter.format(Math.round(comparedAt * rate));
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

{#if $marketCurrency && final.price !== '-1'}
	<div
		in:fade={{ delay: 350, duration: 50 }}
		use:removeNonComponentChildren
		class="pdp-price"
		class:has-discount={final.comparedAt}
		class:small={theme === 'small'}
		class:big={theme === 'big'}
	>
		{#if final.comparedAt}
			<div class="pdp-price--compared-at">
				{final.comparedAt}
			</div>
		{/if}
		<div class="pdp-price--price">{final.price}</div>
	</div>
{/if}

<style lang="scss">
	.pdp-price {
		font-family: 'Monument', sans-serif;
		display: flex;

		&.small {
			gap: 8px;
			font-size: 16px;
			letter-spacing: -0.22px;
			color: rgb(124, 124, 124);
			justify-content: center;

			@media screen and (max-width: 1024px) {
				font-size: 12px;
				gap: 4px;
			}
		}

		&.big {
			gap: 16px;
			font-size: 42px;
			color: #000;

			@media screen and (max-width: 1024px) {
				font-size: 20px;
				gap: 8px;
			}
		}

		&.has-discount {
			.pdp-price--price {
				color: rgb(210, 25, 16);
			}
		}

		&--compared-at {
			text-decoration: line-through;
		}
	}
</style>
