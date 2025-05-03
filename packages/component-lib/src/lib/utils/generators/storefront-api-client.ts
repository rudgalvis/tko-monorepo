import { createStorefrontApiClient as maker } from '@shopify/storefront-api-client';

export const createStorefrontApiClient = () => {
	const SHOPIFY_SHOP_URL = import.meta.env.VITE_SHOPIFY_SHOP_URL;
	const STOREFRONT_API_ACCESS_TOKEN = import.meta.env.VITE_PUBLIC_STOREFRONT_API_ACCESS_TOKEN;

	if (!SHOPIFY_SHOP_URL)
		throw new Error('VITE_SHOPIFY_SHOP_URL environment variable is not defined');

	if (!STOREFRONT_API_ACCESS_TOKEN)
		throw new Error('VITE_PUBLIC_STOREFRONT_API_ACCESS_TOKEN environment variable is not defined');

	return maker({
		storeDomain: SHOPIFY_SHOP_URL,
		apiVersion: '2025-01',
		publicAccessToken: STOREFRONT_API_ACCESS_TOKEN
	});
};
