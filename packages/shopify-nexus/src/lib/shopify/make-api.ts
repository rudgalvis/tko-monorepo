import { SHOPIFY_ADMIN_API_ACCESS_TOKEN, SHOPIFY_API_KEY, SHOPIFY_API_SECRET } from '$env/static/private'
import { PUBLIC_SHOPIFY_SHOP_DOMAIN } from '$env/static/public'
import { ApiVersion, LogSeverity, shopifyApi } from '@shopify/shopify-api'
import '@shopify/shopify-api/adapters/node'

export const makeShopifyApi = () => {
	if (!PUBLIC_SHOPIFY_SHOP_DOMAIN) throw new Error('PUBLIC_SHOPIFY_SHOP_DOMAIN environment missing')
	if (!SHOPIFY_API_KEY) throw new Error('SHOPIFY_API_KEY environment missing')
	if (!SHOPIFY_API_SECRET) throw new Error('SHOPIFY_API_SECRET environment missing')
	if (!SHOPIFY_ADMIN_API_ACCESS_TOKEN) throw new Error('SHOPIFY_ADMIN_API_ACCESS_TOKEN environment missing')

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

	const session = shopify.session.customAppSession(PUBLIC_SHOPIFY_SHOP_DOMAIN)
	session.accessToken = SHOPIFY_ADMIN_API_ACCESS_TOKEN

	const client = new shopify.clients.Graphql({ session })

	return {
		shopify,
		session,
		client,
	}
}
