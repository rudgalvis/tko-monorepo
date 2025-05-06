<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import KnittersAccordion from './KnittersAccordion.svelte';
	import type { Knitter } from '$lib/custom-elements/knitters/types.js';

	const knitters: Knitter[] = [
		{
			name: 'Danutė',
			id: 'danute-1',
			description:
				'You won’t find anyone who loves their 9-5 quite as much as our knitter Danutė does. A ray of sunshine, Danutė adores knitting above anything and considers it her own personal form of meditation. Knitting is one thing that makes her truly happy; that and her 3 Persian cats. One woman that she’s constantly inspired by and is most proud of is her daughter.',
			photo:
				'//www.theknottyones.com/cdn/shop/files/fullfilled-4_big_424x539_7abe3d02-6239-4a13-af93-db34340b3f4b_424x539.webp?v=1656950527',
			avatar:
				'//www.theknottyones.com/cdn/shop/files/fullfilled-4_small_124x124_856e4476-e656-4653-bfd3-a2452ae8b223_124x124.webp?v=1656950527'
		},
		{
			name: 'Onute',
			id: 'onute-2',
			description:
				'You won’t find anyone who loves their 9-5 quite as much as our knitter Danutė does. A ray of sunshine, Danutė adores knitting above anything and considers it her own personal form of meditation. Knitting is one thing that makes her truly happy; that and her 3 Persian cats. One woman that she’s constantly inspired by and is most proud of is her daughter.',
			photo:
				'//www.theknottyones.com/cdn/shop/files/fullfilled-4_big_424x539_7abe3d02-6239-4a13-af93-db34340b3f4b_424x539.webp?v=1656950527',
			avatar:
				'//www.theknottyones.com/cdn/shop/files/fullfilled-4_small_124x124_856e4476-e656-4653-bfd3-a2452ae8b223_124x124.webp?v=1656950527'
		},
		{
			name: 'A',
			id: 'A-3',
			description:
				'You won’t find anyone who loves their 9-5 quite as much as our knitter Danutė does. A ray of sunshine, Danutė adores knitting above anything and considers it her own personal form of meditation. Knitting is one thing that makes her truly happy; that and her 3 Persian cats. One woman that she’s constantly inspired by and is most proud of is her daughter.',
			photo:
				'//www.theknottyones.com/cdn/shop/files/fullfilled-4_big_424x539_7abe3d02-6239-4a13-af93-db34340b3f4b_424x539.webp?v=1656950527',
			avatar:
				'//www.theknottyones.com/cdn/shop/files/fullfilled-4_small_124x124_856e4476-e656-4653-bfd3-a2452ae8b223_124x124.webp?v=1656950527'
		},
		{
			name: 'B',
			id: 'B-4',
			description:
				'You won’t find anyone who loves their 9-5 quite as much as our knitter Danutė does. A ray of sunshine, Danutė adores knitting above anything and considers it her own personal form of meditation. Knitting is one thing that makes her truly happy; that and her 3 Persian cats. One woman that she’s constantly inspired by and is most proud of is her daughter.',
			photo:
				'//www.theknottyones.com/cdn/shop/files/fullfilled-4_big_424x539_7abe3d02-6239-4a13-af93-db34340b3f4b_424x539.webp?v=1656950527',
			avatar:
				'//www.theknottyones.com/cdn/shop/files/fullfilled-4_small_124x124_856e4476-e656-4653-bfd3-a2452ae8b223_124x124.webp?v=1656950527'
		},
		{
			name: 'C',
			id: 'C-5',
			description:
				'You won’t find anyone who loves their 9-5 quite as much as our knitter Danutė does. A ray of sunshine, Danutė adores knitting above anything and considers it her own personal form of meditation. Knitting is one thing that makes her truly happy; that and her 3 Persian cats. One woman that she’s constantly inspired by and is most proud of is her daughter.',
			photo:
				'//www.theknottyones.com/cdn/shop/files/fullfilled-4_big_424x539_7abe3d02-6239-4a13-af93-db34340b3f4b_424x539.webp?v=1656950527',
			avatar:
				'//www.theknottyones.com/cdn/shop/files/fullfilled-4_small_124x124_856e4476-e656-4653-bfd3-a2452ae8b223_124x124.webp?v=1656950527'
		}
	];

	const { Story } = defineMeta({
		title: 'custom-elements/knitters/<knitter-accordion>',
		component: KnittersAccordion
	});
</script>

<Story name="Default">
	<knitter-accordion>
		{#each knitters as knitter}
			<knitter-accordion-item {...knitter}> </knitter-accordion-item>
		{/each}
	</knitter-accordion>
</Story>
