<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import CartNote from "$lib/custom-elements/cart/CartNote.svelte";

    const { Story } = defineMeta({
        title: 'custom-elements/<cart-note>',
        component: CartNote,
    });
</script>

<Story name="Default" />
