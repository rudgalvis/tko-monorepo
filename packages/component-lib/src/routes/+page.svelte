<!--suppress ES6UnusedImports -->
<script lang="ts">
	/* Importing custom elements, keep them even tho unsued */
	import { CartRecommendationCard } from '$lib';

	/* Regular imports */
	import { browser } from '$app/environment';
	import CartRecommendations from '$lib/custom-elements/CartRecommendations.svelte';
	import { cartjs_GET_response_1 } from '$lib/data/mock/cartjs-GET.response.1.js';
	import { recommendationProductsGETResponse1 } from '$lib/data/mock/recommendation.products.GET.response.1.js';

	const cartItem = recommendationProductsGETResponse1;
</script>

{#if browser}
	<cart-recommendation-card
		title={cartItem.title}
		featured_image={cartItem.featured_image}
		color={cartItem.variants[0].option1}
		size={cartItem.variants[0].option2}
		url={'#'}
		price={cartItem.price}
		spend_goal="100"
	>
	</cart-recommendation-card>

	<CartRecommendations products={[cartItem, cartItem, cartItem]} />
{/if}
