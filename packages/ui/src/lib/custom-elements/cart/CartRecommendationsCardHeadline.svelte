<script lang="ts">
	export let spend_goal: number | undefined = undefined;
	export let already_spent: number | undefined = undefined;

	export let isFreeGiftQualified = false;

	$: diff = (spend_goal || 0) - (already_spent || 0);
	$: isFreeGiftQualified = diff < 0;
</script>

{#if spend_goal && already_spent}
	{#if isFreeGiftQualified}
		<h4>Choose a free gift</h4>
	{:else}
		<h4>
			Spend €{spend_goal} and choose a free gift from this selection.
			<span class="text-green-600">You're just €{diff} away.</span>
		</h4>
	{/if}
{:else}
	<h4>You may also likes</h4>
{/if}

<style lang="scss">
	@use '../../styles/typography.scss' as types;
	@use '../../styles/colors.scss' as *;

	h4 {
		@include types.title;
		margin: 0 0 10px;
		color: #000;
	}

	@include text-green-600;
</style>
