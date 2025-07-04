<script lang="ts">
	let { children } = $props()
</script>

<p
	style="
	font-size: 14px;
	margin: 0;
	line-height: 150%;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
			'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;"
>
	{@render children?.()}
</p>
