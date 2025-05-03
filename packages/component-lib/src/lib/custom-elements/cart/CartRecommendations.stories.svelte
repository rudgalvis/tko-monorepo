<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import CartRecommendations from './CartRecommendations.svelte';

	const { Story } = defineMeta({
		title: 'custom-elements/<cart-recommendation>',
		component: CartRecommendations,
		args: {
			products: [
				{
					title: 'Title',
					featured_image:
						'https://www.theknottyones.com/cdn/shop/products/2022.09.01TheKnottyOnesxGiedre7627_1200x1500_1_996x1100.jpg?v=1725480482',
					price: '200€',
					url: 'https://www.theknottyones.com/products/kalvos-dove-grey-merino-wool-vest'
				},
				{
					title: 'Title 2',
					featured_image:
						'https://www.theknottyones.com/cdn/shop/products/2022.09.01TheKnottyOnesxGiedre7627_1200x1500_1_996x1100.jpg?v=1725480482',
					price: '200€',
					url: 'https://www.theknottyones.com/products/kalvos-dove-grey-merino-wool-vest'
				}
			]
		}
	});
</script>

<Story name="Default" />
