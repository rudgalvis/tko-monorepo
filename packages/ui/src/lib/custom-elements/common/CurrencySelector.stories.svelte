<script module lang="ts">
	import type { LocalizationOption } from '$lib/types/LocalizationOption.js';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import CurrencySelector from '$lib/custom-elements/common/CurrencySelector.svelte';
	import availableMarkets from '$lib/data/available-markets.json' assert { type: 'json' };

	const { Story } = defineMeta({
		title: 'custom-elements/<currency-selector>',
		component: CurrencySelector,
		args: {
			available: availableMarkets as LocalizationOption[],
			active: availableMarkets[0] as LocalizationOption
		}
	});
</script>

<Story name="Default" />
