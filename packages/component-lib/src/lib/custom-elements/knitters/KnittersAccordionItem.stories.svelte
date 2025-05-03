<script module lang="ts">
	import type { Knitter } from '$lib/custom-elements/knitters/types.js';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import KnittersAccordionItem from './KnittersAccordionItem.svelte';

	const knitter: Knitter = {
		name: 'Danutė',
		id: 'danute-1',
		description:
			'You won’t find anyone who loves their 9-5 quite as much as our knitter Danutė does. A ray of sunshine, Danutė adores knitting above anything and considers it her own personal form of meditation. Knitting is one thing that makes her truly happy; that and her 3 Persian cats. One woman that she’s constantly inspired by and is most proud of is her daughter.',
		photo:
			'//www.theknottyones.com/cdn/shop/files/fullfilled-4_big_424x539_7abe3d02-6239-4a13-af93-db34340b3f4b_424x539.webp?v=1656950527',
		avatar:
			'//www.theknottyones.com/cdn/shop/files/fullfilled-4_small_124x124_856e4476-e656-4653-bfd3-a2452ae8b223_124x124.webp?v=1656950527'
	};

	const { Story } = defineMeta({
		title: 'custom-elements/knitters/<knitter-accordion-item>',
		component: KnittersAccordionItem,
		args: {
			...knitter
		}
	});
</script>

<Story name="Default" />
