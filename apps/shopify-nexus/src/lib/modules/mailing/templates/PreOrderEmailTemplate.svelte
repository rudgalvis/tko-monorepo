<script lang="ts">
	import Body from "$lib/modules/mailing/templates/components/Body.svelte";
	import Footer from '$lib/modules/mailing/templates/components/Footer.svelte'
	import Header from '$lib/modules/mailing/templates/components/Header.svelte'
	import TextBody from '$lib/modules/mailing/templates/components/TextBody.svelte'
	import View from '$lib/modules/mailing/templates/components/View.svelte'

	export let customerName: string = ''
	export let productTitle: string = ''
	export let orderId: string = ''
	export let estimatedShippingDate: string = ''
</script>

<View>
	<Header {orderId} label="PRE-ORDER" />
	<Body>
		<TextBody>Hi, {customerName}</TextBody>

		<br />

		<TextBody>
			We just wanted to take a moment to say a huge thank you for your <b>pre-order</b>
			of the <b>{productTitle}</b>! Your choice means the world to us as we strive to create
			quality pieces while keeping deadstock to a minimum. We believe in thoughtful
			production, which is why we craft our collections in smaller quantities to ensure that
			every piece feels exclusive and special.
		</TextBody>

		<br />

		<TextBody>
			Thanks to your amazing support and that of our fantastic community, the
			<b>{productTitle}</b>
			quickly became a crowd favorite and sold out in just a few weeks! This incredible response
			has led us to offer a pre-order option so we can keep bringing you the exclusivity you love.
		</TextBody>

		<br />

		<TextBody>
			We truly appreciate your patience and loyalty. We’re pouring our hearts into every
			stitch of your soon-to-be favorite knit and we hope the wait is totally worth it. The
			estimated shipping date for your <b>{productTitle}</b> is
			<b>{estimatedShippingDate}</b>.
		</TextBody>

		<br />

		<TextBody>
			If you have any questions or just want to chat, feel free to reach out — we’d love to
			hear from you! 🤍
		</TextBody>

		<Footer />
	</Body>
</View>
