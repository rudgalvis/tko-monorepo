<script context="module">
	import ProductPrice from './ProductPrice.svelte';

	export const meta = {
		title: 'custom-elements/price/<product-price>',
		component: ProductPrice
	};
</script>

<script lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';
</script>

<Story
	name="Default"
	args={{
		price: '10.00€'
	}}
/>

<Story
	name="With discount"
	args={{
		price: '€8.00',
		compared_at: '€10.00'
	}}
/>

<Story
	name="With discount (faulty input)"
	args={{
		price: '€10.00',
		compared_at: '€8.00',
	}}
/>

<Story
	name="As scripted blackrooster.js (legacy support)"
	args={{
		price: '€10.00',
		compared_at: 'nodiscount',
	}}
/>

<Story
	name="Automated discount on specific variant"
	args={{
		price: '€300.00',
		compared_at: 'nodiscount',
		variant_id: '54204479766876',
		iso_code: 'LT',
		DEV_currency: 'EUR',
		DEV_market: 'EUR'
	}}
/>


<Story
	name="Automated discount on product"
	args={{
		price: '€300.00',
		compared_at: 'nodiscount',
		product_id: '7485371416819',
		iso_code: 'LT',
		DEV_currency: 'EUR',
		DEV_market: 'EUR'
	}}
/>
