<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import CartRecommendationCard from './CartRecommendationCard.svelte';

	const { Story } = defineMeta({
		title: 'custom-elements/<cart-recommendation-cards>',
		component: CartRecommendationCard,
		args: {
			title: 'Title',
			featured_image:
				'https://www.theknottyones.com/cdn/shop/products/2022.09.01TheKnottyOnesxGiedre7627_1200x1500_1_996x1100.jpg?v=1725480482',
			price: '200€',
			url: 'https://www.theknottyones.com/products/kalvos-dove-grey-merino-wool-vest'
		}
	});
</script>

<Story name="Default" />
