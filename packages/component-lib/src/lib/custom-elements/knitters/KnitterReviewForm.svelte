<script lang="ts">
	import TitleType from '$lib/components/typography/TitleType.svelte';
	import { supabase } from './../../api/supabase.js';
	import { createEventDispatcher } from 'svelte';
	import Button from '../../components/Button.svelte';

	export let id: string | undefined = undefined;

	let name = '';
	let review = '';
	let formState: 'success' | 'error' | 'idle' = 'idle';

	const dispatch = createEventDispatcher();

	const handleSubmit = async () => {
		const { error } = await supabase.from('knitter_reviews').insert([
			{
				knitter_id: id,
				body: review,
				created_by: name
			}
		]);

		if (error) {
			formState = 'error';
		} else {
			formState = 'success';
		}

		setTimeout(() => dispatch('submit'));
	};
</script>

<TitleType>Leave a feedback</TitleType>

{#if formState === 'idle' || formState === 'error'}
	<form action="" on:submit|preventDefault={handleSubmit}>
		<textarea
			bind:value={review}
			name=""
			id=""
			cols="30"
			rows="10 "
			placeholder="Enter your feedback here..."
		></textarea>

		<div class="cta">
			<input type="text" bind:value={name} placeholder="Enter your name..." />
			{#if formState === 'error'}
				<p class="error">There was an error submitting your message. Please try again later.</p>
			{/if}

			<Button type="submit" fullWidth disabled={!review || !name}>Leave a feedback</Button>
		</div>
	</form>
{:else if formState === 'success'}
	<p class="success">Review submitted successfully!</p>
{/if}

<style lang="scss">
	input {
		border: none;
		padding: 6px 16px;
		border-bottom: 1px solid black;
		width: 100%;
		font-size: 16px;
		margin: 12px 0;
		box-sizing: border-box;
		background: transparent;
		color: black;

		&:focus {
			outline: none;
		}
	}

	h6 {
		font-size: 12px;
		font-family: 'Monument Regular', sans-serif;
		text-transform: uppercase;
		letter-spacing: -0.24px;
		margin: 12px 0;
	}

	p {
		font-family: 'Monument Regular', sans-serif;
		padding: 8px 16px;

		&.success {
			background: #b0beb2;
		}

		&.error {
			background: #f6a3a3;
		}
	}

	textarea {
		width: 100%;
		aspect-ratio: 4/1;
		border: 1px solid black;
		box-sizing: border-box;
		resize: none;
		background: transparent;
		padding: 12px 16px;
		font-family: 'Monument Regular', sans-serif;
		font-size: 16px;
		color: black;

		&:focus {
			outline: none;
		}

		@media screen and (min-width: 1024px) {
			aspect-ratio: 8/1;
			font-size: 16px;
		}
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 12px;
	}

	.cta {
		width: 100%;
		gap: 12px;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto auto;
	}
</style>
