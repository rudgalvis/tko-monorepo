<svelte:options customElement={{ tag: 'product-price', shadow: 'none' }} />

<script lang="ts">
	import { getAutomaticDiscount } from '$lib/api/rrxtko.api.js';
	import {
		type FormattedPrice,
		priceFormatter,
		subtractCurrencyStrings
	} from '$lib/utils/formatters/price-formatter.js';

	export let price: string = '';
	export let compared_at: string | undefined = undefined;
	export let iso_code: string | undefined = undefined;
	export let variant_id: string | undefined = undefined;
	export let theme: 'small' | 'big' = 'big';

	let a: string = price,
		b: string | undefined = compared_at;

	$: a = price;
	$: b = compared_at;

	let p: FormattedPrice;
	$: p = priceFormatter(a, b);

	const tryApplyingAutomaticDiscount = async () => {
		if (!iso_code) return;
		if (!variant_id) return;
		if (compared_at && compared_at !== 'nodiscount') return;

		const { amount } = await getAutomaticDiscount(iso_code, +variant_id);

		if (!amount) return;

		const { formatted } = subtractCurrencyStrings(price, amount);
		a = price;
		b = formatted;
	};

	$: if (iso_code && variant_id && price && (compared_at || !compared_at)) {
		tryApplyingAutomaticDiscount();
	}
</script>

<div
	class="pdp-price"
	class:has-discount={p.compared_at}
	class:small={theme === 'small'}
	class:big={theme === 'big'}
>
	{#if p.compared_at}
		<div class="pdp-price--compared-at">
			{p.compared_at}
		</div>
	{/if}
	<div class="pdp-price--price" class:highlight={p.compared_at}>{p.price}</div>
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
