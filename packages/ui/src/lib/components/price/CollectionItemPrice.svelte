<script lang="ts">
	import type { PriceWithSymbol } from '$lib/types/PriceWithSymbol.js';
	import { priceToDiscount } from '$lib/utils/transformers/price-to-discount.js';

	const { price, comparedAt } = $props<{} & PriceWithSymbol>();

	const discountPercentage = $derived.by(() => priceToDiscount({ price, comparedAt }));
</script>

<div class="price-ui">
	{#if comparedAt}
		<s class="price-ui--value">{comparedAt}</s>
	{/if}

	<p class:red={!!comparedAt} class="price-ui--value">{price}</p>

	{#if discountPercentage}
		<p class="price-ui--value percentage">
			<small class="red">-{discountPercentage}% off</small>
		</p>
	{/if}
</div>

<style lang="scss">
	.price-ui {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0 8px;

		@media screen and (max-width: 1024px) {
			gap: 4px;
		}
	}

	.price-ui--value {
		font-family: 'Monument', sans-serif;
		font-size: 16px;
		color: rgb(124, 124, 124);
		letter-spacing: -0.22px;
		line-height: 1.2em;

		margin: 0;

		@media screen and (max-width: 1024px) {
			font-size: 12px;
		}
	}

	small {
		font-size: 100%;
	}

	.red {
		color: rgb(210, 25, 16);
	}

	.percentage {
		width: 100%;
		text-align: center;
	}
</style>
