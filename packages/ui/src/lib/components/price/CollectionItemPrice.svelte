<script lang="ts">
	import type { PriceWithSymbol } from '$lib/types/PriceWithSymbol.js';
	import { priceToDiscount } from '$lib/utils/transformers/price-to-discount.js';

	const { price, comparedAt } = $props<{} & PriceWithSymbol>();

	const discountPercentage = $derived.by(() => priceToDiscount({ price, comparedAt }));
</script>

<div>
	{#if comparedAt}
		<s>{comparedAt}</s>
	{/if}

	<p class:red={!!comparedAt}>{price}</p>

	{#if discountPercentage}
		<p class="percentage"><small class="red">-{discountPercentage}% off</small></p>
	{/if}
</div>

<style lang="scss">
	div {
		font-family: 'Monument', sans-serif;
		font-size: 16px;
		color: rgb(124, 124, 124);
		letter-spacing: -0.22px;

		display: flex;
			flex-wrap: wrap;
		justify-content: center;
		gap: 0 8px;

		@media screen and (max-width: 1024px) {
			font-size: 12px;

			gap: 4px;
		}
	}

	p {
		margin: 0;
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
