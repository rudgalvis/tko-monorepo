<svelte:options customElement={{ tag: 'size-selector', shadow: 'none' }} />

<script lang="ts">
	type SizeVariant = {
		url: string;
		label: string;
		id: string;
	};

	let { activeId, list: _list } = $props<{
		activeId: string;
		list: SizeVariant[];
	}>();

	/* Parse string json input to actual object */
	let list: SizeVariant[] = $derived.by(() => {
		try {
			return JSON.parse(_list);
		} catch (e) {
			console.error(e);
			return [];
		}
	});
</script>

<div class="size-selector">
	{#each list as item}
		<a href={item.url} class="pill" class:active={+item.id === +activeId}>
			{item.label}
		</a>
	{/each}
</div>

<style lang="scss">
	.size-selector {
		line-height: 0;
		display: flex;
		gap: 8px;
	}

	.pill {
		font-family: 'Monument', sans-serif;
		font-size: 16px;
		letter-spacing: -0.15px;
		text-transform: uppercase;
		line-height: 100%;

		display: block;
		color: black;
		text-decoration: none;
		border: 1px solid black;
		border-radius: 20px;
		padding: 4px 24px;
		cursor: pointer;
		transition: background 0.2s ease;

		&:hover:not(.active) {
			background: rgba(0, 0, 0, 0.1);
		}

		&.active {
			background: #000;
			color: #fff;
		}
	}
</style>
