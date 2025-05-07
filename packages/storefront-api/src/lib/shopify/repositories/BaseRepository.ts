import { SHOPIFY_SHOP_DOMAIN, SHOPIFY_STOREFRONT_ACCESS_TOKEN } from '$env/static/private';
import {
	createStorefrontApiClient as maker,
	type StorefrontApiClient
} from '@shopify/storefront-api-client';

export class BaseRepository {
	protected client: StorefrontApiClient;

	constructor() {
		if (!SHOPIFY_SHOP_DOMAIN)
			throw new Error('SHOPIFY_SHOP_DOMAIN environment variable is not defined');

		if (!SHOPIFY_STOREFRONT_ACCESS_TOKEN)
			throw new Error('SHOPIFY_STOREFRONT_ACCESS_TOKEN environment variable is not defined');

		this.client = maker({
			storeDomain: SHOPIFY_SHOP_DOMAIN,
			apiVersion: '2025-01',
			publicAccessToken: SHOPIFY_STOREFRONT_ACCESS_TOKEN
		});
	}
}
