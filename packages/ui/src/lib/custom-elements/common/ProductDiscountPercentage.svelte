<svelte:options customElement="product-discount-percentage" />

<script lang="ts">
	import {
		calculateDiscountPercentage,
		type FormattedPrice,
		priceFormatter,
		subtractCurrencyStrings
	} from '$lib/utils/formatters/price-formatter.js';
	import { NexusApi } from "storefront-api";

	export let price: string = '';
	export let compared_at: string | undefined = undefined;
	export let iso_code: string | undefined = undefined;
	export let variant_id: string | undefined = undefined;
	export let theme: 'small' | 'big' = 'big';

	let a: string = price,
		b: string | undefined = compared_at;

	const nexusApi = new NexusApi();

	$: a = price;
	$: b = compared_at;

	let p: FormattedPrice;
	$: p = priceFormatter(a, b);

	export let discountPercentage: string | undefined;
	$: discountPercentage = calculateDiscountPercentage(p.price, p.compared_at);

	const tryApplyingAutomaticDiscount = async () => {
		if (!iso_code) return;
		if (!variant_id) return;
		if (compared_at && compared_at !== 'nodiscount') return;

		const { amount } = await nexusApi.getAutomaticDiscount(iso_code, +variant_id);

		if (!amount) return;

		const { formatted } = subtractCurrencyStrings(price, amount);
		a = price;
		b = formatted;
	};

	$: if (iso_code && variant_id && price && (compared_at || !compared_at)) {
		tryApplyingAutomaticDiscount();
	}
</script>

{#if discountPercentage && +discountPercentage > 0}
	<div
		class="discount-percentage"
		class:has-discount={p.compared_at && p.compared_at !== p.price}
		class:small={theme === 'small'}
		class:big={theme === 'big'}
	>
		-{discountPercentage}% off
	</div>
{/if}

<style lang="scss">
	.discount-percentage {
		font-family: 'Monument', sans-serif;
		color: rgb(210, 25, 16);

		&.small {
			gap: 8px;
			font-size: 16px;
			letter-spacing: -0.22px;

			@media screen and (max-width: 1024px) {
				font-size: 12px;
				gap: 4px;
			}
		}

		&.big {
			gap: 16px;
			font-size: 42px;

			@media screen and (max-width: 1024px) {
				font-size: 20px;
				gap: 8px;
			}
		}
	}
</style>
