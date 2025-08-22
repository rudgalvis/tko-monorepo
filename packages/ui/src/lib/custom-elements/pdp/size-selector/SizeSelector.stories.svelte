<script context="module">
	import SizeSelector from './SizeSelector.svelte';
	import listInput from './dump-list.json' with { type: 'json' };

	export const meta = {
		title: 'custom-elements/pdp/size-selector/<size-selector>',
		component: SizeSelector
	};
</script>

<script lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';
</script>

<Story
	name="Default"
	args={{
		activeId: '54488354586972',
		list: JSON.stringify(listInput)
	}}
/>
