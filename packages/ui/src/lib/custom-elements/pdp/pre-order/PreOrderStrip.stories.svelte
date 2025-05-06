<script module lang="ts">
	import PreOrderStrip from '$lib/custom-elements/pdp/pre-order/PreOrderStrip.svelte';
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'custom-elements/pdp/pre-order/<pre-order-strip>',
		component: PreOrderStrip
	});
</script>

<Story
	name="Fetch"
	args={{
		handle: 'delcia-lemon-cotton-sweater',
		variantId: 49342086119772
	}}
/>
<Story name="Print" args={{ message: 'Pre-order message' }} />
