import {
	PUBLIC_SHOPIFY_SHOP_DOMAIN,
	PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
} from '$env/static/public';
import {
	createStorefrontApiClient as maker,
	type StorefrontApiClient
} from '@shopify/storefront-api-client';

export class BaseRepository {
	protected client: StorefrontApiClient;

	constructor() {
		if (!PUBLIC_SHOPIFY_SHOP_DOMAIN)
			throw new Error('SHOPIFY_SHOP_DOMAIN environment variable is not defined');

		if (!PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN)
			throw new Error('SHOPIFY_STOREFRONT_ACCESS_TOKEN environment variable is not defined');

		this.client = maker({
			storeDomain: PUBLIC_SHOPIFY_SHOP_DOMAIN,
			apiVersion: '2025-01',
			publicAccessToken: PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
		});
	}
}
