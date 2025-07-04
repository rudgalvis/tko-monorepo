<script lang="ts">
	import Hr from "$lib/mailing/templates/components/Hr.svelte";
	import TextBody from '$lib/mailing/templates/components/TextBody.svelte'
	import TextCaption from "$lib/mailing/templates/components/TextCaption.svelte";
	import TextSmall from "$lib/mailing/templates/components/TextSmall.svelte";

	export let customerName: string = ''
	export let productTitle: string = ''
	export let orderId: string = ''
	export let estimatedShippingDate: string = ''
</script>

<table style="width: 100%;  margin: 40px 0; color: #777;">
	<tbody>
		<tr>
			<td>
				<center>
					<table
						border="0"
						cellpadding="0"
						cellspacing="0"
						width="100%"
						style=" width: 100%; max-width: 600px; margin-bottom: 40px;"
					>
						<tbody>
							<tr>
								<td>
									<a href="https://theknottyones.com" target="_blank">
										<img
											style="width: 240px;"
											src="https://cdn.shopify.com/s/files/1/1243/8188/files/tko-logo-png_800x800_90dc571a-fa57-4f07-a98a-4b2a6276587b.png?v=1678286452"
											alt="The Knotty Ones Logo"
										/>
									</a>
								</td>
								<td style="text-align: right; color: #999;">{#if orderId}<TextCaption>PRE-ORDER #{orderId}</TextCaption>{/if}</td>
							</tr>
						</tbody>
					</table>
					<table border="0" cellpadding="0" cellspacing="0" width="100%" style=" width: 100%; max-width: 600px;">
						<tbody>
							<tr>
								<td style="line-height: 150%;">
									<TextBody>Hi, {customerName}</TextBody>

									<br />

									<TextBody>
										We just wanted to take a moment to say a huge thank you for your <b>pre-order</b
										>
										of the <b>{productTitle}</b>! Your choice means the world to us as we strive to
										create quality pieces while keeping deadstock to a minimum. We believe in
										thoughtful production, which is why we craft our collections in smaller
										quantities to ensure that every piece feels exclusive and special.
									</TextBody>

									<br />

									<TextBody>
										Thanks to your amazing support and that of our fantastic community, the
										<b>{productTitle}</b>
										quickly became a crowd favorite and sold out in just a few weeks! This incredible
										response has led us to offer a pre-order option so we can keep bringing you the exclusivity
										you love.
									</TextBody>

									<br />

									<TextBody>
										We truly appreciate your patience and loyalty. We’re pouring our hearts into
										every stitch of your soon-to-be favorite knit and we hope the wait is totally
										worth it. The estimated shipping date for your <b>{productTitle}</b> is
										<b>{estimatedShippingDate}</b>.
									</TextBody>

									<br />

									<TextBody>
										If you have any questions or just want to chat, feel free to reach out — we’d
										love to hear from you! 🤍
									</TextBody>

									<Hr/>

									<TextSmall>
										If you have any questions, reply to this email or contact us at
										<br>
										<a href="mailto:hello@theknottyones.com" style="color: #B4BED6; text-decoration: none;">hello@theknottyones.com</a>
									</TextSmall>
								</td>
							</tr>
						</tbody>
					</table>
				</center>
			</td>
		</tr>
	</tbody>
</table>
