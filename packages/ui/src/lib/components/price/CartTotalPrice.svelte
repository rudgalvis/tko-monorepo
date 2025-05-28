<script lang="ts">
    import type { PriceWithSymbol } from '$lib/types/PriceWithSymbol.js';

    const { price, comparedAt } = $props<{} & PriceWithSymbol>();
</script>

<div class="price-ui">
    {#if comparedAt}
        <s class="price-ui--value">{comparedAt}</s>
    {/if}

    <p class:red={!!comparedAt} class="price-ui--value">{price}</p>
</div>

<style lang="scss">
    .price-ui {
        display: flex;
        gap: 0 8px;

        @media screen and (max-width: 1024px) {
            gap: 4px;
        }
    }

    .price-ui--value {
        font-family: 'Monument', sans-serif;
        font-size: 22px;
        line-height: 19px;
        color: black;

        margin: 0;

    }

    .red {
        color: rgb(210, 25, 16);
    }
</style>
