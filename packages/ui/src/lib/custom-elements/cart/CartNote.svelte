<svelte:options customElement={{ tag: 'cart-note', shadow: 'none' }} />

<script lang="ts">
	import { onMount } from 'svelte';

	const { isCartEmpty } = $props<{ isCartEmpty: string }>();

	const isNoteShowing = $derived(isCartEmpty === 'false');

	const STAGING_ONLY = false; // Requires staging local storage to be set to true to show
	const staging = localStorage.getItem('staging') === 'true';
	const stagingValidation = $derived((STAGING_ONLY && staging) || !STAGING_ONLY);

	// Debounce function
	function debounce(fn: Function, wait: number) {
		let t: ReturnType<typeof setTimeout>;
		return (...args: any[]) => {
			clearTimeout(t);
			t = setTimeout(() => fn.apply(this, args), wait);
		};
	}

	// Add or update cart note
	const updateCartNote = (note) => {
		fetch('/cart/update.js', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				note: note
			})
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('Cart note updated:', data);
				// Handle success
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

	// Debounced version of updateCartNote with 500ms delay
	const debouncedUpdateCartNote = debounce(updateCartNote, 500);

	// onChange handler for the textarea
	function onChange(event: Event) {
		const target = event.target as HTMLTextAreaElement;
		const note = target.value;
		debouncedUpdateCartNote(note);
	}

	let note = $state('');

	const parseCartJSForNote = () => {
		const { cart } = window.CartJS || {};

		if (!cart) return;

		const { note: _note } = cart as { note?: string };

		if (!_note) return;

		note = _note;
	};

	onMount(() => {
		parseCartJSForNote()

		// Add event listeners for jQuery-triggered events
		globalThis.$(document).on('cart.ready', parseCartJSForNote);

		// Cleanup function
		return () => {
			globalThis.$(document).off('cart.ready', parseCartJSForNote);
		};
	});
</script>

{#if stagingValidation}
	{#if isNoteShowing}
		<textarea
			oninput={onChange}
			bind:value={note}
			class="cart-note"
			placeholder="Leave a note about your order"
		></textarea>
	{/if}
{/if}

<style>
	textarea.cart-note {
		border: 1px solid black;
		width: 100%;
		height: 100px;
		padding: 10px 10px;
		font-size: 14px;
		line-height: 1.2;
		resize: none;
	}
</style>
