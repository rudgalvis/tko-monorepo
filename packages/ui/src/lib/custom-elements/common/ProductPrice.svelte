<svelte:options customElement={{ tag: 'product-price', shadow: 'none' }} />

<script lang="ts">
	import { displayCurrency, marketCurrency } from '$lib/store/currency.js';
	import { removeNonComponentChildren } from '$lib/utils/dom/remove-non-component-children.js';
	import { subtractCurrencyStrings } from '$lib/utils/formatters/price-formatter.js';
	import { NexusApi } from 'storefront-api';
	import { onMount } from "svelte";

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
		devCurrency
	} = $props<{
		price: string; // 10€, €10
		compared_at?: string; // 10€, €10, nodiscount
		iso_code?: string; // LT, AU, ...
		variant_id?: string; // numeric
		theme?: 'small' | 'big';
		devCurrency: 'EUR' | 'AUD' | 'GBP' | 'USD'; // For storybook usage
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

	// DEV ONLY
	$effect(() => {
		displayCurrency.set(devCurrency);
	})

	// Normalize input
	$effect(() => {
		// Step 1: Create temporary values to batch our changes
		// This prevents infinite loop by preparing values before state updates
		let newPrice = inputPrice;
		let newComparedAt = inputComparedAt;

		// Step 2: Normalize 'nodiscount' value coming from legacy code
		if (newComparedAt === 'nodiscount') {
			newComparedAt = undefined;
		}

		// Step 4: Fix faulty input by swapping values
		// (when price is less than compared_at)
		if (newPrice < newComparedAt) {
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
		// Fetch currency rates


		console.log({ $marketCurrency, $displayCurrency });
	});

	onMount(() => {
		fetchCurrencyRates()
	})

	const fetchCurrencyRates = async () => {
		const r = await nexusApi.getCurrencyRates($marketCurrency)

		console.log(r)
	}

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

<div
	use:removeNonComponentChildren
	class="pdp-price"
	class:has-discount={autoDiscountApplied.comparedAt}
	class:small={theme === 'small'}
	class:big={theme === 'big'}
>
	{#if autoDiscountApplied.comparedAt}
		<div class="pdp-price--compared-at">
			{autoDiscountApplied.comparedAt}
		</div>
	{/if}
	<div class="pdp-price--price">{autoDiscountApplied.price}</div>
</div>

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
