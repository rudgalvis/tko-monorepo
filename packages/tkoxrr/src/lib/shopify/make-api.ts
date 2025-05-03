import { env } from '$env/dynamic/private';
import { SHOPIFY_API_KEY, SHOPIFY_API_SECRET, SHOPIFY_SHOP_DOMAIN } from '$env/static/private';
import { ApiVersion, LogSeverity, shopifyApi } from '@shopify/shopify-api';

// In test environments, we need to use the Node adapter from '@shopify/shopify-api/adapters/node'
// to ensure Shopify API requests work correctly. However, in production/server environments
// (particularly when handling webhook endpoints), the Node adapter cannot be used as it
// causes the application to crash.
let customRestClient: any;

if (process.env.NODE_ENV === 'test' || true) {
	// Dynamic import with top-level await ensures ESM compatibility while keeping the
	// codebase synchronous. This simplifies the dependency injection pattern used
	// throughout the repository layer.
	//@ts-ignore
	customRestClient = (await import('@shopify/shopify-api/adapters/node')).Node;
}

export const makeShopifyApi = () => {
	const shopify = shopifyApi({
		billing: undefined,
		isEmbeddedApp: false,
		apiKey: SHOPIFY_API_KEY || '',
		apiSecretKey: SHOPIFY_API_SECRET || '',
		scopes: ['write_products', 'read_orders'],
		hostName: 'your-app-domain.com',
		apiVersion: ApiVersion.January25,
		customRestClient,
		logger: {
			level: LogSeverity.Error
		}
	});

	const session = shopify.session.customAppSession(SHOPIFY_SHOP_DOMAIN);
	session.accessToken = env.SHOPIFY_ACCESS_TOKEN;

	const client = new shopify.clients.Graphql({ session });

	return {
		shopify,
		session,
		client
	};
};
