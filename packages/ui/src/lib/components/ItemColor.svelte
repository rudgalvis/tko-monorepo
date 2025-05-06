<script lang="ts">
	import { onMount } from 'svelte';

	export let color: string | undefined = undefined;

	let colorMap: { name: string, color: string }[] = [];
	let background: string | undefined = undefined;

	onMount(async () => {
		/* Following logic of TKO */
		const colorHolder = document.getElementById('data-holder');
		if (!colorHolder) return console.log('No color holder found');

		const attr = colorHolder.getAttribute('data-colors')
		if(!attr) return console.log('No data-colors attribute found');

		colorMap = JSON.parse(`[${attr}]`); // This is random part on TKO, they have malformed JSON
	});

	$: if (color && colorMap.length > 0) {
		const colorObj = colorMap.find((c) => c.name === color);

		if (!colorObj) {
			console.log('No color found');
		} else {
			if (colorObj.color.slice(0, 1) === '#') {
				background = `background-color: ${colorObj.color}`;
			} else {
				background = `background: url(${colorObj.color})`;
			}
		}
	}
</script>

{#if background}
	<div style={background}></div>
{/if}

<style>
    div {
        width: 25px;
        height: 25px;
        border-radius: 25px;
    }
</style>

