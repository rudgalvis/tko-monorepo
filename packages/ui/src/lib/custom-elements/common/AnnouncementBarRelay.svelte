<svelte:options customElement={{ tag: 'announcement-bar-relay', shadow: 'none' }} />

<script lang="ts">
	import AnnouncementBar, {
		type AnnouncementProps
	} from '$lib/components/AnnouncementBar.svelte';
	import { removeNonComponentChildren } from '$lib/utils/dom/remove-non-component-children.js';

	const { dataStr } = $props<{ dataStr: string }>();

	const data: AnnouncementProps['content'] = $derived.by(() => {
		try {
			return JSON.parse(dataStr);
		} catch (e) {
			console.error('Failed to parse JSON:', e);
			return []; // or some default value
		}
	});
</script>

<div use:removeNonComponentChildren>
	<AnnouncementBar content={data} />
</div>
