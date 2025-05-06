<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	export let fullWidth: boolean = false;
	export let disabled: boolean = false;

	export let type: HTMLButtonAttributes['type'] = 'button';
</script>

<button {type} class:w-full={fullWidth} class:disabled {disabled}>
	<slot></slot>
</button>

<style>
	button {
		width: 178px;
		height: 52px;
		background: #018849;
		cursor: pointer;
		border: none;
		color: #fff;
		font-family: Monument, sans-serif;
		font-size: 16px;
		letter-spacing: -0.25px;
		text-transform: uppercase;
		display: flex;
		align-items: center;
		word-break: keep-all;
		white-space: nowrap;
		justify-content: center;
	}

	.w-full {
		width: 100%;
	}

	.disabled {
		opacity: 0.5;
		cursor: default;
	}
</style>
