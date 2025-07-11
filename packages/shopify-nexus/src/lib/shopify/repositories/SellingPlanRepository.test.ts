import { SHOPIFY_ADMIN_API_ACCESS_TOKEN } from '$env/static/private'
import {
	PUBLIC_SHOPIFY_SHOP_DOMAIN,
	PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
} from '$env/static/public'
import { SellingPlanRepository } from '$lib/shopify/repositories/SellingPlanRepository'
import {test} from 'vitest'

test('test', async () => {
	const sellingPlanRepo = new SellingPlanRepository()

	const r = await sellingPlanRepo.getSellingPlan2()

	console.log(r.product.sellingPlanGroups.edges[0].node)
	console.log(r.product.sellingPlanGroups.edges[0].node.sellingPlans.edges)
	console.log(r.product.sellingPlanGroups.edges[0].node.sellingPlans.edges[0].node)
})

test('test2', async () => {
	const response = await fetch(
		`https://${PUBLIC_SHOPIFY_SHOP_DOMAIN}/admin/api/2024-10/selling_plan_groups.json`,
		{
			headers: {
				'X-Shopify-Access-Token': SHOPIFY_ADMIN_API_ACCESS_TOKEN,
			},
		}
	)

	try {
		const a = await response.json()
		console.log({PUBLIC_SHOPIFY_SHOP_DOMAIN, a})
	} catch (e) {
		console.log({e})
	}

	console.log(response)
})