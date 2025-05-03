<svelte:options customElement="knitter-accordion" />

<script lang="ts">
	import ContentWrapper from '$lib/components/ContentWrapper.svelte';
	import { onMount } from 'svelte';

	let knitterId: string = '';

	onMount(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const { knitter } = Object.fromEntries(urlParams.entries());

		knitterId = knitter;
	});

	const scrollToKnitter = (id: string) => {
		const el = document.getElementById(id);
		if (!el) return;

		el.scrollIntoView({ behavior: 'smooth' });
	};

	$: if (knitterId) scrollToKnitter(knitterId);
</script>

<div>
	<ContentWrapper>
		<section class="title-section">
			<h2>All Knitters</h2>
		</section>

		<section class="list">
			<slot />
		</section>
	</ContentWrapper>
</div>

<style lang="scss">
	h2 {
		font-size: 28px;
		letter-spacing: -0.43px;
		line-height: 18px;
		font-weight: 300;
		margin: 0;

		@media screen and (min-width: 1024px) {
			font-family: Panama, sans-serif;
			font-size: 62px;
			letter-spacing: -0.95px;
			line-height: 70px;
			color: #000;
		}
	}

	.title-section {
		height: 93px;
		border-top: 1px solid black;
		border-bottom: 1px solid black;
		display: flex;
		align-items: center;

		@media screen and (min-width: 1024px) {
			height: 241px;
			justify-content: center;
		}
	}

	.list {
		display: flex;
		flex-direction: column;
	}
</style>
