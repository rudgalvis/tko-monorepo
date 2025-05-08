<svelte:options customElement="currency-selector" />

<script lang="ts">
	import { displayCurrency } from "$lib/store/currency.js";
	import type { LocalizationOption } from '$lib/types/LocalizationOption.js';
	import { expoOut, sineIn } from 'svelte/easing';

	function flyScale(
		node: HTMLElement,
		{
			y = 100,
			scale = 0.5,
			duration = 300,
			easing = sineIn // Try different easing functions
		}
	) {
		return {
			duration,
			easing,
			css: (t: number) => `
        transform:
          scale(${scale + (1 - scale) * t})
          translateY(${(1 - t) * y}px);
        opacity: ${t};
      `
		};
	}

	export let params: string | undefined = undefined;
	export let available: LocalizationOption[] = [];
	export let active: LocalizationOption | undefined = undefined;
	export let left: boolean = true;
	export let center: boolean = false;
	export let right: boolean = false;
	export let bg: string = '#eeeeea';

	let isOpen = false;
	let initialised = false

	const handleSelect = (option: LocalizationOption) => {
		isOpen = false;
		active = option;
		displayCurrency.set(option.currency)
	};

	$: if(!initialised && params && $displayCurrency) {
		initialised = true

		try {
			const {available: a} = JSON.parse(params);
			available = a;

			active = a.find((option: LocalizationOption) => option.currency === $displayCurrency);
		} catch (e) {
			console.error('UI', e);
		}
	}
</script>

<div class="wrapper">
	{#if active}
		<button class="main" on:click={() => (isOpen = !isOpen)}
			>{active.symbol} {active.currency}</button
		>
	{/if}

	<div class="dropdown" class:left class:center class:right>
		{#if isOpen}
			<ul
				style={`background: ${bg}`}
				role="menu"
				transition:flyScale={{
					y: -16,
					scale: 0.95,
					duration: 250,
					easing: expoOut
				}}
			>
				{#each available as option}
					<li role="menuitem">
						<button class="menuitem" on:click={() => handleSelect(option)}>
							{option.symbol}
							{option.currency}
						</button>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>

<style lang="scss">
	.wrapper {
		display: inline-flex;
		position: relative;
	}

	button.main {
		background: transparent;
		padding: 8px 16px;
		border: none;
		cursor: pointer;
		width: max-content;
		font-weight: 600;
	}

	.dropdown {
		position: absolute;
		top: 100%;
		margin-top: 8px;

		&.left {
			left: 0;
		}
		&.center {
			left: 50%;
			transform: translateX(-50%);
		}
		&.right {
			right: 0;
		}
	}

	ul {
		list-style: none;
		padding: 0 0;
		width: max-content;
		margin: 0;
		border: 1px solid rgba(0, 0, 0, 0.01);
	}

	button.menuitem {
		background: transparent;
		border: none;
		padding: 8px 16px;
		transition: background-color 0.3s ease;
		cursor: pointer;
		font-weight: 600;

		&:hover {
			background: rgba(0, 0, 0, 0.05);
		}
	}
</style>
