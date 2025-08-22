import { getShopQuery } from '$lib/shopify/queries/getShopQuery'
import { type SellingPlanResponseReturn } from '$lib/shopify/queries/sellingPlanQuery'
import { BaseRepository } from '$lib/shopify/repositories/BaseRepository'

export class ShopRepository extends BaseRepository {
	async getShop() {
		const { data, errors } = await this.client.request<SellingPlanResponseReturn>(getShopQuery)

		if (errors) console.error(errors)

		if (!data) return null

		return data
	}
}