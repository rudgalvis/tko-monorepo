<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
    import DevMarketDetails from "$lib/custom-elements/dev/DevMarketDetails.svelte";

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'custom-elements/dev/DevMarketDetails',
		component: DevMarketDetails
	});
</script>

<Story name="Default" />
