import {
	getProductVariantsQuery,
	type GetProductVariantsResponse
} from '$lib/shopify/queries/GetProductVariantsQuery.js';
import { BaseRepository } from '$lib/shopify/repositories/BaseRepository.js';
import { CartRepository } from '$lib/shopify/repositories/CartRepository.js';
import { generateVariantGid } from "$lib/shopify/utils/generators/gid-generator.js";

const DEBUG = false;

export class StorefrontApi extends BaseRepository {
	constructor(private cartRepository = new CartRepository()) {
		super();
	}

	async getAutomaticDiscountForVariant(countryCode: string, variantId: number) {
		const {id: cartId} = await this.cartRepository.createCartWithBuyerIdentity(countryCode);

		const cart  = await this.cartRepository.addLineItems(cartId, [{variantGid: generateVariantGid(variantId), quantity: 1}])

		if(!cart) throw Error('Failed to create cart');

		return cart.lines.nodes[0].discountAllocations[0].discountedAmount.amount;
	}

	async getPreOrderMessage(productHandle: string, variantId?: number) {
		if (!productHandle) throw new Error('variantId is required');
		if (!variantId) throw new Error('variantId is required');

		const { data, errors } = await this.client.request<GetProductVariantsResponse>(
			getProductVariantsQuery,
			{
				variables: {
					handle: productHandle
				}
			}
		);

		if (errors) {
			console.error(errors.graphQLErrors);

			return null;
		}

		if (!data?.productByHandle) return null;

		// Parsing response

		// Find specific variant from the list
		const variant = data.productByHandle.variants.edges.find(
			(edge) => edge?.node?.id === `gid://shopify/ProductVariant/${variantId}`
		)?.node;

		if (!variant) return null;

		const { metafield } = variant;

		if (!metafield) return null;

		return metafield.value;
	}
}
