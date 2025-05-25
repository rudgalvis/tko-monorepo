<script lang="ts">
	import type { PriceWithSymbol } from '$lib/types/PriceWithSymbol.js';
    import { priceToDiscount } from "$lib/utils/transformers/price-to-discount.js";

	const { price, comparedAt } = $props<{} & PriceWithSymbol>();

    const discountPercentage = $derived.by(() => priceToDiscount({price, comparedAt}));
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
		font-size: 42px;
		color: #000;

        display: flex;
        gap: 0 16px;

		@media screen and (max-width: 1024px) {
			font-size: 20px;

            gap: 0px 8px;
            flex-wrap: wrap;
		}
	}

    p {
        margin: 0;
    }

    small {
        font-size: 66%;
    }

    .red {
        color: rgb(210, 25, 16);
    }

    .percentage {
        @media screen and (max-width: 1024px) {
            width: 100%;
            line-height: .6;
        }
    }
</style>
