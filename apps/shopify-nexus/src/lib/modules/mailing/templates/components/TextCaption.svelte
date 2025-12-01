<script lang="ts">
	import { bodyFontFamily } from "$lib/modules/mailing/templates/components/body-font-family.svelte.js";

	let { children } = $props()
</script>

<p
	style="
	margin: 0;
	font-size: 14px;
	line-height: 150%;
	font-family: {bodyFontFamily}"
>
	{@render children?.()}
</p>
