<script lang="ts">
	export type AnnouncementProps = {
		content: {
			mobileMessage: string;
			desktopMessage: string;
		}[];
	};

	const { content } = $props<{} & AnnouncementProps>();

    // TODO: add bg colors
    // TODO: add vertical swiper
    // TODO: fix for mobile
</script>

{#each content as { mobileMessage, desktopMessage }}
	<div class="mobile-message">
		{@html mobileMessage}
	</div>
	<div class="desktop-message">
		{@html desktopMessage}
	</div>
{/each}

<style lang="scss">
	.mobile-message {
		@media screen and (min-width: 1024px) {
			display: none;
		}
	}

	.desktop-message {
		display: none;

		@media screen and (min-width: 1024px) {
			display: block;
		}
	}
</style>
