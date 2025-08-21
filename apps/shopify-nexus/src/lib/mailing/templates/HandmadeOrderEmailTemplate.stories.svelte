<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf'
    import HandmadeOrderEmailTemplate from './HandmadeOrderEmailTemplate.svelte'

    // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
    const { Story } = defineMeta({
        title: 'Email/Templates/HandmadeItemsProcessingTemplate',
        component: HandmadeOrderEmailTemplate,
    })
</script>

<Story
        name="Default"
        args={{
		orderId: '34532',
		customerName: 'Rokas',
	}}
/>
