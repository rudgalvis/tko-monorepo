<svelte:options customElement="cart-recommendation" />

<script lang="ts">
	import { browser } from '$app/environment';
	import CartRecommendationCard from './CartRecommendationCard.svelte';
	import Swiper from 'swiper';
	import 'swiper/swiper-bundle.css';

	export let products: any[] = [];

	let swiperEl: HTMLElement;
	let swiper: Swiper;

	$: if (browser && swiperEl) {
		if (swiper) {
			swiper?.destroy();
		}

		swiper = new Swiper(swiperEl, {
			slidesPerView: 'auto',
			spaceBetween: 20,
			loop: true
		});
	}
</script>

{#if products}
	<div bind:this={swiperEl} class="swiper">
		<div class="swiper-wrapper">
			{#each products as item}
				<div class="swiper-slide">
					<CartRecommendationCard
						title={item.title}
						price={item.price}
						featured_image={item.featured_image}
						onPrevious={"console.log('Previous')"}
						onNext={"console.log('Next')"}
						url={item.url || '#'}
					/>
				</div>
			{/each}
		</div>
	</div>
{/if}

<style>
	.swiper {
		width: 100%;
	}
</style>
