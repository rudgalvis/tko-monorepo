<svelte:options customElement={{ tag: 'product-price', shadow: 'none' }} />

<script lang="ts">
	import { getAutomaticDiscount } from '$lib/api/rrxtko.api.js';
	import { removeNonComponentChildren } from '$lib/utils/dom/remove-non-component-children.js';
	import {
		priceFormatter,
		subtractCurrencyStrings
	} from '$lib/utils/formatters/price-formatter.js';
	import { NexusApi } from "storefront-api";

	type PriceStrCouple = {
		price: string;
		comparedAt?: string;
	};

	const {
		theme = 'big',
		price: inputPrice,
		compared_at: inputComparedAt,
		iso_code: market,
		variant_id
	} = $props<{
		price: string; // 10€, €10
		compared_at?: string; // 10€, €10, nodiscount
		iso_code?: string;
		variant_id?: string;
		theme?: 'small' | 'big';
	}>();

	const normalized = $state<PriceStrCouple>({
		price: inputPrice,
		comparedAt: inputComparedAt
	});

	const autoDiscountApplied = $state<PriceStrCouple>({
		price: inputPrice,
		comparedAt: inputPrice
	});

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
		if (!market) return;
		if (!variant_id) return;
		if (!normalized.price) return;
		if (normalized.comparedAt) return; // Only check if no regular compared at is present

		tryApplyingAutomaticDiscount({ ...normalized }).then(({ price, comparedAt }) => {
			autoDiscountApplied.price = price;
			autoDiscountApplied.comparedAt = comparedAt;
		});
	});

	// Apply display currency changes

	// Default values can be set through props.theme.init('big') etc if needed
	let a = $state(inputPrice);
	let b = $state(inputComparedAt);

	$effect(() => {
		a = inputPrice;
		b = inputComparedAt;
	});

	const p = $derived(priceFormatter(a, b));

	const tryApplyingAutomaticDiscount = async ({
		price: orgPrice
	}: PriceStrCouple): Promise<PriceStrCouple> => {
		const nexusApi = new NexusApi();

		const { amount } = await nexusApi.getAutomaticDiscount(market, +variant_id);

		if (!amount || amount === 0) return {
			price: orgPrice,
			comparedAt: undefined
		};

		const { formatted: newPrice } = subtractCurrencyStrings(orgPrice, amount);

		return {
			price: newPrice,
			comparedAt: orgPrice
		};
	};

	//	$effect(() => {
	//		console.log('dump', { ...theme });
	//	});

	//	$effect(() => {
	//		if (
	//			market &&
	//			variant_id &&
	//			inputPrice &&
	//			(inputComparedAt || !market) // Just to trigger the effect
	//		) {
	//			tryApplyingAutomaticDiscount();
	//		}
	//	});

	//	let formattedPrice = $derived(p.price);
	//	let formattedComparedAt = $derived(p.compared_at);

	//	const convertToCurrency = (
	//		price: string,
	//		compared_at: string | undefined,
	//		marketCurrency: string,
	//		displayCurrency: string
	//	) => {
	//		const from = marketCurrency;
	//		const to = displayCurrency || from;
	//
	////		format(p.price, p.compared_at)
	//
	//		const { value: priceVal } = parseCurrencyString(p.price);
	//
	//		formattedPrice = Intl.NumberFormat('en-US', {style: 'currency', currency: to}).format(priceVal);
	//
	//		if(p.compared_at) {
	//			const {value: comparedAtVal} = parseCurrencyString(p.compared_at);
	//			compared_at = Intl.NumberFormat('en-US', {style: 'currency', currency: to}).format(comparedAtVal);
	//		}
	//
	//		return price;
	//	};
	//
	//	$effect(() => {
	//		convertToCurrency(p.price, p.compared_at, $marketCurrency, $displayCurrency);
	//	});
</script>

<div
	use:removeNonComponentChildren
	class="pdp-price"
	class:has-discount={p.compared_at && p.compared_at !== p.price}
	class:small={theme === 'small'}
	class:big={theme === 'big'}
>
	{#if p.compared_at && p.compared_at !== p.price}
		<div class="pdp-price--compared-at">
			{p.compared_at}
		</div>
	{/if}
	<div class="pdp-price--price">{p.price}</div>
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
