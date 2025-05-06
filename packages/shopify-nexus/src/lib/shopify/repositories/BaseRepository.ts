import { makeShopifyApi } from '$lib/shopify/make-api'
import { currencyQuery, type CurrencyReturn } from '$lib/shopify/queries/currencyQuery'
import { GraphqlClient } from '@shopify/shopify-api'

export class BaseRepository {
	public client: GraphqlClient

	constructor() {
		const { client: c } = makeShopifyApi()

		this.client = c
	}

	async getCurrencyCode() {
		const { data, errors } = await this.client.request<CurrencyReturn>(currencyQuery)

		if (errors) console.error(errors)

		if (!data) return null

		return data.shop.currencyCode
	}
}
