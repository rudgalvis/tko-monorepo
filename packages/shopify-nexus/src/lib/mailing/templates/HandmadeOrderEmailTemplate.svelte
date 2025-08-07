<script lang="ts">
	import Body from '$lib/mailing/templates/components/Body.svelte'
	import Footer from '$lib/mailing/templates/components/Footer.svelte'
	import Header from '$lib/mailing/templates/components/Header.svelte'
	import TextBody from '$lib/mailing/templates/components/TextBody.svelte'
	import View from '$lib/mailing/templates/components/View.svelte'

	export let customerName: string = ''
	export let orderId: string = ''
</script>

<View>
	<Header {orderId} label="HANDMADE-ORDER" />
	<Body>
		<TextBody>Hi, {customerName}</TextBody>

		<br />

		<TextBody>Thank you so much for choosing The Knotty Ones! 🤍</TextBody>

		<br />

		<TextBody>
			We noticed that your purchase includes handmade items. Our handmade pieces are carefully
			knitted by our team of female artisans and can take up to 14 working days to be completed by
			hand.
		</TextBody>

		<br />

		<TextBody>If you ordered machine-made items, we can ship them separately; just let us know if you
			prefer to receive in-stock items sooner. Otherwise, we will ship it together once the full
			order is ready.
		</TextBody>

		<br />

		<TextBody>
			Thank you so much for supporting artisanal craftsmanship. ✨
		</TextBody>

		<br />

		<TextBody>Warmly,</TextBody>

		<TextBody>The Knotty Ones team</TextBody>

		<Footer />
	</Body>
</View>
