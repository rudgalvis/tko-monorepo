<script lang="ts">
    import type { PriceWithSymbol } from '$lib/types/PriceWithSymbol.js';
    import CartItemPrice from "$lib/components/price/CartItemPrice.svelte";

    const props = $props<{} & PriceWithSymbol>();
</script>

<CartItemPrice {...props}/>