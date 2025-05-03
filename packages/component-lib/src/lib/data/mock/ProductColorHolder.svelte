<script lang="ts">
	import { colors } from '$lib/data/mock/product-color.result.js';

	const str = JSON.stringify(colors);
	const sliced = str.slice(1, str.length - 1); // remove the square brackets because thats how it's being passed in the data-holder on TKO project
</script>

<div id="data-holder" data-colors={sliced}></div>
