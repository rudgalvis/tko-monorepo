<script lang="ts">
    import type { PriceWithSymbol } from '$lib/types/PriceWithSymbol.js';

    const { price, comparedAt } = $props<{} & PriceWithSymbol>();
</script>

<div>
    {#if comparedAt}
        <s>{comparedAt}</s>
    {/if}

    <p class:red={!!comparedAt}>{price}</p>
</div>

<style lang="scss">
    div {
        font-family: 'Monument', sans-serif;
        font-size: 22px;
        color: black;

        display: flex;
        gap: 0 8px;

        @media screen and (max-width: 1024px) {
            font-size: 12px;

            gap: 4px;
        }
    }

    p {
        margin: 0;
    }

    .red {
        color: rgb(210, 25, 16);
    }
</style>
