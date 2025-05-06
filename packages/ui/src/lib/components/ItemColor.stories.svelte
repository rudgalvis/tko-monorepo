<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ItemColor from './ItemColor.svelte';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'Components/ItemColors',
		component: ItemColor
	});

	let colors = {
		name: 'black',
		color: '#000'
	};
</script>

<div id="data-holder" data-colors={JSON.stringify(colors)}></div>

<Story name="Black" args={{ color: 'black' }} />
