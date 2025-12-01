<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf'
    import CustomizedOrderEmailTemplate from './CustomizedOrderEmailTemplate.svelte'

    // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
    const { Story } = defineMeta({
        title: 'Email/Templates/CustomizedOrderEmailTemplate',
        component: CustomizedOrderEmailTemplate,
    })
</script>

<Story
        name="Default"
        args={{
		customerName: 'Rokas',
		productTitle: 'Delčia: Lemon Cotton Sweater',
		estimatedShippingDate: '2024 04 04',
		orderId: '123123',
	}}
/>
