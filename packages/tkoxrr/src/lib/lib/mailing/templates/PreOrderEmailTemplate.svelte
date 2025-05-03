<script lang="ts">
	export let customerName: string = ''
	export let productTitle: string = ''
	export let estimatedShippingDate: string = ''
</script>

<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
	<tbody>
		<tr>
			<td style="">
				<p>Hi, {customerName}</p>

				<p>
					We just wanted to take a moment to say a huge thank you for your pre-order of the <b
						>{productTitle}</b
					>! Your choice means the world to us as we strive to create quality pieces while keeping
					deadstock to a minimum. We believe in thoughtful production, which is why we craft our
					collections in smaller quantities to ensure that every piece feels exclusive and special.
				</p>

				<p>
					Thanks to your amazing support and that of our fantastic community, the
					<b>{productTitle}</b>
					quickly became a crowd favorite and sold out in just a few weeks! This incredible response
					has led us to offer a pre-order option so we can keep bringing you the exclusivity you love.
				</p>

				<p>
					We truly appreciate your patience and loyalty. We’re pouring our hearts into every stitch
					of your soon-to-be favorite knit and we hope the wait is totally worth it. The estimated
					shipping date for your <b>{productTitle}</b> is <b>{estimatedShippingDate}</b>.
				</p>

				<p>
					If you have any questions or just want to chat, feel free to reach out — we’d love to hear
					from you! 🤍
				</p>
			</td>
		</tr>
	</tbody>
</table>
