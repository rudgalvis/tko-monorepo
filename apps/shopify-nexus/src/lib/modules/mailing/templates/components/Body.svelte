<script>
	let { children } = $props()
</script>

<table
	border="0"
	cellpadding="0"
	cellspacing="0"
	width="100%"
	style=" width: 100%; max-width: 600px;"
>
	<tbody>
		<tr>
			<td style="line-height: 150%;">
				{@render children()}
			</td>
		</tr>
	</tbody>
</table>
