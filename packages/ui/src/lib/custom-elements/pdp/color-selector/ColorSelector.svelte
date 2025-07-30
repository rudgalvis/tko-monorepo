<svelte:options customElement={{ tag: 'color-selector', shadow: 'none' }} />

<script lang="ts">
	import { removeNonComponentChildren } from '$lib/utils/dom/remove-non-component-children.js';
	import Swiper from 'swiper';
	import { Scrollbar, Mousewheel } from 'swiper/modules';
	import 'swiper/scss';

	type ColorVariant = {
		url: string;
		images: string[];
		id: string;
	};

	let { activeId, list: _list } = $props<{
		activeId: string;
		list: ColorVariant[];
	}>();

	/* Parse string json input to actual object */
	let list: ColorVariant[] = $derived.by(() => {
		try {
			if (!_list) return [];
			return JSON.parse(_list);
		} catch (e) {
			console.error('Failed parsing JSON.', e);
			return [];
		}
	});

	let swiperEl = $state<HTMLDivElement>();
	let swiper = $state<Swiper>();
	let inited = $state<boolean>(false);

	// Find the active item index
	let activeIndex = $derived.by(() => {
		if (!list || !activeId) return 0;
		const index = list.findIndex((item) => +item.id === +activeId);
		return index !== -1 ? index : 0;
	});

	const initSwiper = () => {
		if (!swiperEl) return;

		swiper = new Swiper(swiperEl, {
			modules: [Scrollbar, Mousewheel],

			slidesPerView: 'auto',
			spaceBetween: 8,
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true
			},
			mousewheel: {
				enabled: true,
				forceToAxis: false, // Forces horizontal scrolling even on vertical wheel movement
				sensitivity: 1, // Adjust sensitivity (optional)
				releaseOnEdges: true, // Prevents page scroll when reaching swiper edges
			},


			on: {
				init: (s: Swiper & { virtualSize: number; size: number }) => {
					setTimeout(() => {
						//						swiperEl.style.opacity = '1';
						const needsScrollbar = s.virtualSize > s.size;

						if (needsScrollbar && activeIndex > 0) {
							s.slideTo(activeIndex, 0); // 300ms transition
						}

						console.log('dump', swiper)

						inited = true;
					}, 100);
				}
			}
		});
	};

	$effect(() => {
		if (!swiperEl) return;

		initSwiper();
	});
</script>

<section class="" use:removeNonComponentChildren={inited}>
	<div class="swiper color-selector--swiper-wrapper" class:swiper--inited={inited} bind:this={swiperEl}>
		<div class="swiper-wrapper">
			{#each list as item}
				<div class="swiper-slide">
					<a href={item.url} class="color-selector--link">
						<img
							class:active={+item.id === +activeId}
							class="color-selector--image"
							src={item?.images[0]}
							alt="img"
						/>
					</a>
				</div>
			{/each}
		</div>
		<div class="swiper-scrollbar"></div>
	</div>
	<!--	<div class="wrapper">-->
	<!--		<div class="color-selector">-->
	<!--			{#each [...list, ...list, ...list, ...list, ...list, ...list] as item}-->
	<!--				<a href={item.url} class="color-selector&#45;&#45;link">-->
	<!--					<img-->
	<!--						class:active={+item.id === +activeId}-->
	<!--						class="color-selector&#45;&#45;image"-->
	<!--						src={item?.images[0]}-->
	<!--						alt="img"-->
	<!--					/>-->
	<!--				</a>-->
	<!--			{/each}-->

	<!--			{#if list.length === 0}-->
	<!--				<div class="color-selector&#45;&#45;image skeleton"></div>-->
	<!--			{/if}-->
	<!--		</div>-->
	<!--	</div>-->
</section>

<style lang="scss">
	.swiper {
		width: calc(100% - 25px);
		margin: 0;
		overflow: visible;
		line-height: 0;
		opacity: 0;
		height: 0;
		transition: opacity 0.3s ease;

		&--inited {
			height: auto;
			opacity: 1;
		}
	}

	.color-selector--link {
		display: inline-block;
	}

	.swiper-slide {
		width: 64px;

		@media screen and (max-width: 767px) {
			width: 44px;
		}
	}

	.color-selector--image {
		min-width: 64px;
		height: 64px;
		border-radius: 5px;

		@media screen and (max-width: 767px) {
			min-width: 44px;
			height: 44px;
		}
	}

	.color-selector--image.active {
		outline: 2px solid black;
		outline-offset: -2px;
	}

	:root {
		//--swiper-scrollbar-bottom: 4px;
		//--swiper-scrollbar-size: 10px;
		--swiper-scrollbar-bg-color: rgba(0, 0, 0, 0.2);
		--swiper-scrollbar-sides-offset: 0;
	}

	:global(.swiper-scrollbar) {
		transform: scaleX(0.95);
	}

	:global(.swiper-scrollbar) {
		transition: opacity 0.3s ease;
	}

	:global(.swiper-horizontal > .swiper-scrollbar, .swiper-scrollbar.swiper-scrollbar-horizontal) {
		width: 100% !important;
	}

	:global(.swiper-scrollbar-drag) {
		background: rgba(0, 0, 0, 0.3);
		border-radius: 10px;
		cursor: grab;
	}

	:global(.swiper-scrollbar-drag:active) {
		cursor: grabbing;
	}
</style>
