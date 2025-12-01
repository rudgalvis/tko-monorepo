<script lang="ts">
	import Body from '$lib/modules/mailing/templates/components/Body.svelte'
	import Footer from '$lib/modules/mailing/templates/components/Footer.svelte'
	import Header from '$lib/modules/mailing/templates/components/Header.svelte'
	import TextBody from '$lib/modules/mailing/templates/components/TextBody.svelte'
	import View from '$lib/modules/mailing/templates/components/View.svelte'

	export let customerName: string = ''
	export let orderId: string = ''
</script>

<View>
	<Header {orderId} label="CUSTOMIZED-ORDER" />
	<Body>
		<TextBody>Hi, {customerName}</TextBody>

		<br />

		<TextBody>Thank you so much for your order. 🤍</TextBody>

		<br />

		<TextBody>We're grateful for the opportunity to create a custom piece for you.</TextBody>

		<br />

		<TextBody>
			As you've selected a customized item, this item will be made-to-order personally for you;
			please note that the knitting process may take up to 14 working days. If we have any questions
			about your request during this time, we’ll be in touch.
		</TextBody>
		<br />

		<TextBody>
			We truly appreciate your support and look forward to crafting your one-of-a-kind piece ✨
		</TextBody>

		<br />

		<TextBody>Warmly,</TextBody>

		<TextBody>The Knotty Ones team</TextBody>

		<Footer />
	</Body>
</View>
