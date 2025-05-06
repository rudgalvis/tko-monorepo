<script lang="ts">
	import { supabase } from '$lib/api/supabase.js';
	import CaptionType from '$lib/components/typography/CaptionType.svelte';
	import TitleType from '$lib/components/typography/TitleType.svelte';
	import KnitterReviewItem from '$lib/custom-elements/knitters/KnitterReviewItem.svelte';
	import KnitterReviewsListSkeleton from '$lib/custom-elements/knitters/KnitterReviewsListSkeleton.svelte';
	import type { KnitterUserReview } from '$lib/custom-elements/knitters/types.js';
	import { fade } from 'svelte/transition';
	import Swiper from 'swiper';

	export let id: string | undefined = undefined;
	export let isFetchBlock: boolean = false;

	let swiper: Swiper;
	let swiperEl: HTMLElement;
	let reviews: KnitterUserReview[] = [];
	let isShowAllowed = false;
	let initialized = false;

	const fetchReviews = async () => {
		if (!id) return console.error('No id provided');

		const { data, error } = await supabase
			.from('knitter_reviews')
			.select('*')
			.order('created_at', { ascending: false })
			.eq('knitter_id', id);

		if (data) {
			reviews = data.map((e) => ({
				...e,
				created_at: new Date(e.created_at)
			})) as KnitterUserReview[];

			setTimeout(() => (isShowAllowed = true));

			if (swiper) swiper.update();

			initialized = true;
		}
	};

	$: if (!isFetchBlock && !initialized) fetchReviews();
</script>

<TitleType>Customers feedback</TitleType>
{#if !isShowAllowed}
	<KnitterReviewsListSkeleton />
{:else if reviews.length === 0}
	<p>No messages yet. Be first one to leave a feedback.</p>
{:else}
	<section transition:fade>
		{#each reviews as review}
			<figure>
				<KnitterReviewItem {review} />
			</figure>
		{/each}
	</section>
{/if}

<style lang="scss">
	figure {
		border-bottom: 1px solid black;
		margin: 12px 0;
		padding: 0 0 12px 0;

		@media screen and (min-width: 1024px) {
			margin: 24px 0;
			padding: 0 0 24px 0;
		}
	}

	section {
		margin-bottom: 40px;

		@media screen and (min-width: 1024px) {
			margin-bottom: 60px;
		}
	}

	p {
		font-family:
			Monument Regular,
			sans-serif;
		opacity: 0.5;
		margin-bottom: 32px;
	}
</style>
