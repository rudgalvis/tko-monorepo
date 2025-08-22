<script context="module">
	import ColorSelector from './ColorSelector.svelte';
	import variantsInput from './dump-variants.json' with { type: 'json' };

	export const meta = {
		title: 'custom-elements/pdp/color-selector/<color-selector>',
		component: ColorSelector
	};
</script>

<script lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';
</script>

<Story
	name="Default"
	args={{
		activeId: 7485371416819,
		list: JSON.stringify(variantsInput)
	}}
/>
<Story
	name="Sceleton"
	args={{
	}}
/>
