<script lang="ts">
	import { bodyFontFamily } from "$lib/mailing/templates/components/body-font-family.svelte";

	let { children } = $props()
</script>

<p
	style="
	margin: 0;
	font-size:16px;
	line-height: 150%;
	font-family: {bodyFontFamily}"
>
	{@render children?.()}
</p>
