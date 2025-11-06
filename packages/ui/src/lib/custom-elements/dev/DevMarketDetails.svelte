<svelte:options customElement="dev-market-details" />

<script lang="ts">
	import { displayCurrency, marketCurrency, localization } from '$lib/store/currency.js';
	import { getCookie } from '$lib/utils/browser/storage/get-cookie.js';

	const { show = false } = $props<{ show: boolean }>();
</script>

{#if show}
	<table>
		<tbody>
			<tr>
				<td>cookies</td>
				<td>cart_currency</td>
				<td>{getCookie('cart_currency')}</td>
			</tr>
			<tr>
				<td>cookies</td>
				<td>localization</td>
				<td>{getCookie('localization')}</td>
			</tr>
			<tr>
				<td>localStorage</td>
				<td>displayCurrency</td>
				<td>{$displayCurrency}</td>
			</tr>
			<tr>
				<td>localStorage</td>
				<td>marketCurrency</td>
				<td>{$marketCurrency}</td>
			</tr>
			<tr>
				<td>localStorage</td>
				<td>localization</td>
				<td>{$localization}</td>
			</tr>
		</tbody>
	</table>
{/if}

<style>
	table {
		position: fixed;
		top: 8px;
		left: 8px;
		z-index: 10000;
		background: black;
		color: white;
		padding: 5px;
		font-size: 12px;
	}
</style>
