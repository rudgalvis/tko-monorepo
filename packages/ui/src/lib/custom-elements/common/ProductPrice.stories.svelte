<script context="module">
	import ProductPrice from './ProductPrice.svelte';

	export const meta = {
		title: 'custom-elements/price/<product-price>',
		component: ProductPrice,
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
		compared_at: '€8.00',
		price: '€10.00'
	}}
/>

<Story
	name="As blackrooster.js scripted"
	args={{
		compared_at: 'nodiscount',
		price: '€10.00'
	}}
/>

<Story
	name="Automated discount"
	args={{
		iso_code: 'LT',
		variant_id: '54204479766876',
		compared_at: 'nodiscount',
		price: '€300.00',

	}}
/>
