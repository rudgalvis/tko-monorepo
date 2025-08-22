import {
	sellingPlanQuery,
	type SellingPlanResponseReturn,
} from '$lib/shopify/queries/sellingPlanQuery'
import { tempQuery } from '$lib/shopify/queries/temp'
import { BaseRepository } from '$lib/shopify/repositories/BaseRepository'

export class SellingPlanRepository extends BaseRepository {
	async getSellingPlan(id: number) {
		const { data, errors } = await this.client.request<SellingPlanResponseReturn>(
			sellingPlanQuery,
			{ variables: { sellingPlanId: `gid://shopify/SellingPlan/${id}` } }
		)

		if (errors) console.error(errors)

		if (!data) return null

		return data
	}
	async getSellingPlan2() {
		const { data, errors } = await this.client.request<SellingPlanResponseReturn>(
			tempQuery,
			{ variables: { id: `gid://shopify/Product/7485371416819` } }
		)

		if (errors) console.error(errors)

		if (!data) return null

		return data
	}
}
