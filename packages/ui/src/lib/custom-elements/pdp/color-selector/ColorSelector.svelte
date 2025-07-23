<svelte:options customElement={{ tag: 'color-selector', shadow: 'none' }} />

<script lang="ts">
	import { removeNonComponentChildren } from '$lib/utils/dom/remove-non-component-children.js';

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
</script>

<section use:removeNonComponentChildren>
	<div class="color-selector">
		{#each list as item}
			<a href={item.url} class="color-selector--link">
				<img
					class:active={+item.id === +activeId}
					class="color-selector--image"
					src={item?.images[0]}
					alt="img"
				/>
			</a>
		{/each}

		{#if list.length === 0}
			<div class="color-selector--image skeleton"></div>
		{/if}
	</div>
</section>

<style lang="scss">
	.color-selector {
		display: flex;
        gap: 8px;
        line-height: 0;
	}

	.color-selector--link {
		display: inline-block;
	}

	.color-selector--image {
		width: 64px;
		height: 64px;
		border-radius: 5px;

        @media screen and (max-width: 767px) {
            width: 44px;
            height: 44px;
        }

		&.skeleton {
			background: #f2f2f2;
		}
	}

	.color-selector--image.active {
		outline: 1px solid black;
        outline-offset: -1px;
	}
</style>
