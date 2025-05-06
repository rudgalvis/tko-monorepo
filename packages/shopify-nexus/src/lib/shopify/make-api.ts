import { env } from '$env/dynamic/private'
import { SHOPIFY_API_KEY, SHOPIFY_API_SECRET, SHOPIFY_SHOP_DOMAIN } from '$env/static/private'
import { ApiVersion, LogSeverity, shopifyApi } from '@shopify/shopify-api'
import '@shopify/shopify-api/adapters/node'

export const makeShopifyApi = () => {
	const shopify = shopifyApi({
		billing: undefined,
		isEmbeddedApp: false,
		apiKey: SHOPIFY_API_KEY || '',
		apiSecretKey: SHOPIFY_API_SECRET || '',
		scopes: ['write_products', 'read_orders'],
		hostName: 'your-app-domain.com',
		apiVersion: ApiVersion.January25,
//		customRestClient: NodeAdapter,
		logger: {
			level: LogSeverity.Error,
		},
	})

	const session = shopify.session.customAppSession(SHOPIFY_SHOP_DOMAIN)
	session.accessToken = env.SHOPIFY_ADMIN_API_ACCESS_TOKEN

	const client = new shopify.clients.Graphql({ session })

	return {
		shopify,
		session,
		client,
	}
}
