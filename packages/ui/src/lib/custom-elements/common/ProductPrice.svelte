<svelte:options customElement={{ tag: 'product-price', shadow: 'none' }} />

<script lang="ts">
	import { getAutomaticDiscount } from '$lib/api/rrxtko.api.js';
	import { displayCurrency, marketCurrency } from '$lib/store/currency.js';
	import { removeNonComponentChildren } from '$lib/utils/dom/remove-non-component-children.js';
	import {
		parseCurrencyString,
		priceFormatter,
		subtractCurrencyStrings
	} from '$lib/utils/formatters/price-formatter.js';

	const {
		theme = 'big',
		price,
		compared_at,
		iso_code,
		variant_id
	} = $props<{
		price: string;
		compared_at?: string;
		iso_code?: string;
		variant_id?: string;
		theme?: 'small' | 'big';
	}>();

	// Default values can be set through props.theme.init('big') etc if needed
	let a = $state(price);
	let b = $state(compared_at);

	$effect(() => {
		a = price;
		b = compared_at;
	});

	const p = $derived(priceFormatter(a, b));

	const tryApplyingAutomaticDiscount = async () => {
		if (!iso_code) return;
		if (!variant_id) return;
		if (compared_at && compared_at !== 'nodiscount') return;

		const { amount } = await getAutomaticDiscount(iso_code, +variant_id);

		if (!amount) return;

		const { formatted: formatedComparedAt } = subtractCurrencyStrings(price, amount);
		a = price;

		if (price !== formatedComparedAt) b = formatedComparedAt;
	};

	$effect(() => {
		console.log('dump', { ...theme });
	});

	$effect(() => {
		if (
			iso_code &&
			variant_id &&
			price &&
			(compared_at || !compared_at) // Just to trigger the effect
		) {
			tryApplyingAutomaticDiscount();
		}
	});

	let formattedPrice = $derived(p.price);
	let formattedComparedAt = $derived(p.compared_at);

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
