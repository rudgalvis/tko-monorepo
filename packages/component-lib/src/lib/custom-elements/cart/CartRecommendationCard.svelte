<svelte:options customElement="cart-recommendation-card" />

<script lang="ts">
	import CartRecommendationsCardHeadline from './CartRecommendationsCardHeadline.svelte';

	export let id: string | undefined = undefined;
	export let title: string | undefined = undefined;
	export let featured_image: string | undefined = undefined;
	export let price: number | undefined = undefined;
	export let url: string | undefined = undefined;
	export let onPrevious: string = '';
	export let onNext: string = '';

	/**
	 * Gifting logic. Spend x to get free gift, calculate how much spending is missing.
	 * Upsell should be configured in shopify discover apps and discounts
	 * */
	export let spend_goal: number | undefined = 1;
	export let already_spent: number | undefined = 2;
	let isFreeGiftQualified = false;

	const addToCart = () => {
		if (!window.CartJS) return console.error('Trying to add item, but CartJS is not accessible');
		if (!id) return console.error('Trying to add item, but id is not provided');

		window.CartJS.addItem(id, 1);
	};

	const toItem = () => {
		if (!url) return;

		window.location.href = url;
	};
</script>

{#if title && featured_image && price && url}
	<article class="card">
		<img src={featured_image} alt={title} on:click={toItem} />

		<div class="content">
			<!--			<CartRecommendationsCardHeadline {spend_goal} {already_spent} bind:isFreeGiftQualified />-->

			<h3 on:click={toItem}>{title}</h3>
			<div class="tuple text-green-600">
				<p class="price" class:stroke={isFreeGiftQualified}>{price}</p>
			</div>

			<div class="ctas-buttons">
				<a
					on:click={() => eval(onPrevious)}
					class="caret"
					class:caret---qualified={isFreeGiftQualified || true}
					style="transform: rotate(180deg)"
				>
					<svg
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						fill-rule="evenodd"
						clip-rule="evenodd"
					>
						<path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z" />
					</svg>
				</a>

				<a class="cta" on:click={addToCart}><span>Add to cart</span></a>

				<!--{#if !isFreeGiftQualified}-->
				<!--	<a href={url} aria-label="View product" style="background-color:#000000; color:#ffffff;">-->
				<!--		View Product-->
				<!--	</a>-->
				<!--{:else}-->
				<!--	<a class="cta" on:click={addToCart}><span>Add for free</span></a>-->
				<!--{/if}-->

				<a
					on:click={() => eval(onNext)}
					class="caret"
					class:caret---qualified={isFreeGiftQualified || true}
				>
					<svg
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						fill-rule="evenodd"
						clip-rule="evenodd"
					>
						<path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z" />
					</svg>
				</a>
			</div>
		</div>
	</article>
{/if}

<style lang="scss">
	@use '../../styles/global.scss' as *;

	.cta {
		@extend .bg-green-600;

		color: #ffffff;
		cursor: pointer;
	}

	.card {
		width: 100%;
		max-width: 400px;
		display: flex;
		gap: 27px;
		color: inherit;
		text-decoration: none;
	}

	.caret {
		background-color: #000000;
		color: #ffffff;
		fill: #ffffff;
		cursor: pointer;
	}

	.caret---qualified {
		background-color: #018849;
	}

	.stroke {
		text-decoration: line-through;
	}

	.ctas-buttons {
		display: flex;
		gap: 1px;
		justify-content: center;
		align-content: center;
	}

	a {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 14px;
		border: none;
		color: #000;
		background-color: #b4bed6;
		font-family: Monument, sans-serif;
		width: 100%;
		height: 41px;
		text-decoration: none;
		text-transform: uppercase;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		letter-spacing: -0.22px;
	}

	a:nth-child(1),
	a:nth-child(3) {
		aspect-ratio: 1 /1;
		flex-shrink: 1;
		width: auto;
	}

	a svg {
		width: 16px;
	}

	.content {
		width: 70%;
		display: flex;
		flex-direction: column;
	}

	h3 {
		margin: 0;
		margin-bottom: 10px;
		font-weight: 100;
		min-height: 32px;
		font-size: 16px;
		color: #000;
		font-family: Panama, sans-serif;
		text-align: left;
		cursor: pointer;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		letter-spacing: -0.22px;
		line-height: 16px;
	}

	h4,
	.price {
		margin: 0 0 10px;
		text-transform: uppercase;
		font-weight: 500;
		font-family: Monument, sans-serif;
		color: #000;
		font-size: 14px;
		letter-spacing: -0.22px;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.price {
		margin-bottom: 10px;
	}

	p {
		margin: 0;
	}

	.tuple {
		display: flex;
		justify-content: space-between;
		align-items: start;
		flex-grow: 1;
	}

	img {
		display: block;
		width: 30%;
		object-fit: cover;
		aspect-ratio: 4 / 5;
		cursor: pointer;
	}
</style>
