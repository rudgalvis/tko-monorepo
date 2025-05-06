<script lang="ts">
	import type { KnitterUserReview } from '$lib/custom-elements/knitters/types.js';

	export let review: KnitterUserReview;
</script>

<div class="review">
	<div class="header">
		<h6>{review.created_by}</h6>
		<p class="date">{review.created_at.toLocaleDateString()}</p>
	</div>
	<p>{review.body}</p>
</div>

<style lang="scss">
	.review {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	p {
		font-family: Monument Regular;
		font-size: 16px;
		color: #000000b3;
		letter-spacing: -0.25px;
		line-height: 26px;
		margin: 0;
	}

	h6,
	.date {
		font-size: 12px;
		font-family: Monument, sans-serif;
		color: #000;
		letter-spacing: -0.18px;
		text-transform: uppercase;
		margin: 0;
	}

	.date {
		opacity: 0.6;
	}

	.header {
		display: flex;
		align-items: center;
		gap: 8px;
		justify-content: space-between;

		@media screen and (min-width: 1024px) {
			padding: 24px 0;
			gap: 12px;
		}
	}
</style>
