<svelte:options customElement={{ tag: 'product-price', shadow: 'none' }} />

<script lang="ts">
	/**
	 * This is a price wrapper that will handle price logic
	 * 1. Robust input handling
	 * 2. Applying regular discount
	 * 3. Applying automatic discount
	 * 4. Applying frontend currency changes
	 * */

	import CartItemPrice from '$lib/components/price/CartItemPrice.svelte';
	import CartTotalPrice from '$lib/components/price/CartTotalPrice.svelte';
	import CollectionItemPrice from '$lib/components/price/CollectionItemPrice.svelte';
	import ProductDetailsPagePrice from '$lib/components/price/ProductDetailsPagePrice.svelte';
	import SearchCardPrice from '$lib/components/price/SearchCardPrice.svelte';
	import { currencyRates, displayCurrency, marketCurrency } from '$lib/store/currency.js';
	import type { PriceWithSymbol as Price } from '$lib/types/PriceWithSymbol.js';
	import { removeNonComponentChildren } from '$lib/utils/dom/remove-non-component-children.js';
	import { normalizePrice } from '$lib/utils/formatters/normalize-price.js';
	import {
		parseCurrencyString,
		subtractFromPriceWithSymbol
	} from '$lib/utils/formatters/price-formatter.js';
	import { NexusApi } from 'storefront-api';
	import { fade } from 'svelte/transition';

	type AvailableTypes =
		| 'ProductDetailsPagePrice'
		| 'CollectionItemPrice'
		| 'CartTotalPrice'
		| 'CartItemPrice'
		| 'SearchCardPrice';

	const {
		price: _price,
		compared_at: _comparedAt,
		iso_code: market,
		variant_id,
		product_id,
		type = 'ProductDetailsPagePrice',
		DEV_currency,
		DEV_market
	} = $props<{
		price: string; // 10€, €10
		compared_at?: string; // 10€, €10, nodiscount
		iso_code?: string; // LT, AU, ...
		variant_id?: string; // numeric
		product_id?: string; // numeric
		type?: AvailableTypes; // Maps to a UI component to use
		DEV_currency?: 'EUR' | 'AUD' | 'GBP' | 'USD'; // For storybook usage
		DEV_market?: 'EUR' | 'AUD' | 'GBP' | 'USD'; // For storybook usage
	}>();

	const nexusApi = new NexusApi();
	const EMPTY_PRICE_OBJECT = {
		price: '-1',
		comparedAt: undefined
	};

	// Step 1. Normalize input
	const normalizedPrice: Price = $derived.by(() => normalizePrice(_price, _comparedAt));

	// Step 2. Apply automatic discount, otherwise hold normalized values
	const autoDiscountedPrice = $state<Price>(EMPTY_PRICE_OBJECT);

	// Step 3. Apply frontend currency changes, otherwise hold autoDiscountedPrice values
	const finalPrice = $state<Price>(EMPTY_PRICE_OBJECT);

	/**
	 * Apply automatic discount if possible
	 * */
	$effect(() => {
		// Take and hold the latest normalized values even if a discount would not be applied
		autoDiscountedPrice.price = normalizedPrice.price;
		autoDiscountedPrice.comparedAt = normalizedPrice.comparedAt;

		if (!market) return;
		if (!variant_id && !product_id) return;
		if (!normalizedPrice.price) return;
		if (normalizedPrice.comparedAt) return; // Only check if no regular compared at is present

		try {
			calculateDiscountedPricing({ ...normalizedPrice }).then(({ price, comparedAt }) => {
				autoDiscountedPrice.price = price;
				autoDiscountedPrice.comparedAt = comparedAt;
			});
		} catch (e) {
			console.error(e);
		}
	});

	/**
	 * Apply display currency changes
	 * */
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

	const calculateDiscountedPricing = async ({ price: orgPrice }: Price) => {
		if (!market) throw new Error('Market is required');

		if (!variant_id && !product_id)
			throw new Error('Either variant or product id is required is required');

		// We have two different strategies depending on which id was provided
		const getterByVariant = nexusApi.getVariantAutomaticDiscount.bind(nexusApi);
		const getterByProduct = nexusApi.getProductAutomaticDiscount.bind(nexusApi);

		const getDiscount = variant_id
			? () => getterByVariant(market, +variant_id)
			: () => getterByProduct(market, +product_id);

		const { amount } = await getDiscount();

		if (!amount || amount === 0)
			return {
				price: orgPrice,
				comparedAt: undefined
			};

		const { formatted: newPrice } = subtractFromPriceWithSymbol(orgPrice, amount);

		return {
			price: newPrice,
			comparedAt: orgPrice
		};
	};

	// DEV ONLY
	$effect(() => {
		if (DEV_currency) displayCurrency.set(DEV_currency);
		if (DEV_market) marketCurrency.set(DEV_market);
	});

	const PriceUi = $derived.by(() => {
		switch (type) {
			case 'CartItemPrice':
				return CartItemPrice;
			case 'CollectionItemPrice':
				return CollectionItemPrice;
			case 'CartTotalPrice':
				return CartTotalPrice;
			case 'SearchCardPrice':
				return SearchCardPrice;
			case 'ProductDetailsPagePrice':
				return ProductDetailsPagePrice;
			default:
				return ProductDetailsPagePrice;
		}
	});

	const shouldShowPrice = $derived($marketCurrency && finalPrice.price !== '-1');
</script>

<div use:removeNonComponentChildren={shouldShowPrice}>
	{#if shouldShowPrice}
		<PriceUi {...finalPrice} />
	{/if}
</div>
