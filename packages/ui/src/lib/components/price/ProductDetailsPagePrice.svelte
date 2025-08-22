<script lang="ts">
	import type { PriceWithSymbol } from '$lib/types/PriceWithSymbol.js';
	import { priceToDiscount } from '$lib/utils/transformers/price-to-discount.js';

	const { price, comparedAt } = $props<{} & PriceWithSymbol>();

	const discountPercentage = $derived.by(() => priceToDiscount({ price, comparedAt }));
</script>

<div class="price-ui">

	<p class:red={!!comparedAt} class="price-ui--value">{price}</p>

	{#if comparedAt}
		<s class="price-ui--value">{comparedAt}</s>
	{/if}

	{#if discountPercentage}
		<p class="price-ui--value percentage">
			<span class="red">-{discountPercentage}% off</span>
		</p>
	{/if}
</div>

<style lang="scss">
	.price-ui {
		display: flex;
		align-items: center;
		gap: 0 16px;

		@media screen and (max-width: 1024px) {
			gap: 0px 8px;
			flex-wrap: wrap;
		}
	}

	.price-ui--value {
		font-family: 'Monument', sans-serif;
		font-size: 48px;
		font-weight: 500;
		color: #000;
		line-height: 1.2em;

		margin: 0;

		@media screen and (max-width: 1024px) {
			font-size: 32px;
		}
	}

	s.price-ui--value {
		font-size: 20px;
		letter-spacing: 0.02em;
		color: rgba(123, 123, 123, 1);
		text-decoration: line-through;

		@media screen and (max-width: 1024px) {
			font-size: 12px;
		}
	}

	.red {
		color: rgba(171, 54, 58, 1)
	}

	.percentage {
		font-size: 20px;
		margin-left: -8px;

		@media screen and (max-width: 1024px) {
			width: 100%;
			line-height: 0.6;
			font-size: 12px;
			margin-left: 0;
		}
	}

	@media screen and (max-width: 1024px) {
		.price-ui {
			display: grid;
			grid-template-columns: auto auto;
			grid-template-rows: auto auto;
			grid-template-areas: "compared-at percentage" "price price";
			//justify-items: flex-end;
			justify-content: flex-end;
		}

		.price-ui--value {
			grid-area: price;
			text-align: right;
		}

		s.price-ui--value {
			grid-area: compared-at;
		}

		.percentage {
			grid-area: percentage;
			white-space: nowrap;
		}
	}
</style>
