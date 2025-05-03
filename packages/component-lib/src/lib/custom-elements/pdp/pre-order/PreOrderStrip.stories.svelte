<script module lang="ts">
	import PreOrderStrip from '$lib/custom-elements/pdp/pre-order/PreOrderStrip.svelte';
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'custom-elements/pdp/pre-order/<pre-order-strip>',
		component: PreOrderStrip,
		args: {
			handle: 'delcia-lemon-cotton-sweater',
			variantId: 49342086119772
		}
	});
</script>

<Story name="Default" />
