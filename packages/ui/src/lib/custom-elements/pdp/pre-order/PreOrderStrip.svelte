<svelte:options customElement={{ tag: 'pre-order-strip', shadow: 'none' }} />

<script lang="ts">
	import '$lib/styles/tailwind.css';
	import { storefrontApi } from '$lib/api/storefront-api.js';
	import { removeNonComponentChildren } from '$lib/utils/dom/remove-non-component-children.js';
	import { fly } from 'svelte/transition';

	export let handle: string | undefined = undefined;
	export let variantId: number | undefined = undefined;
	export let message: string | undefined | null = undefined;

	const fetchMessage = async () => {
		if (!handle || !variantId) {
			message = null;

			return;
		}

		message = await storefrontApi().getPreOrderMessage(handle, variantId);
	};

	$: if (handle && variantId) fetchMessage();
</script>

<div class="min-h-[42px]" use:removeNonComponentChildren>
	{#if message}
		<div
			transition:fly={{ y: 6, duration: 300 }}
			class="bg-blue font-sans
						fixed z-10 bottom-[73px] left-0 right-0 text-[10px]
						sm:static sm:text-[14px] tracking-[-0.34px] sm:min-h-[42px] p-[10px] text-black
							"
		>
			{message}
		</div>
	{/if}
</div>
