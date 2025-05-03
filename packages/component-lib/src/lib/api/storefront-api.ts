import {
	addLineItemsMutation,
	type AddLineItemsMutationResponse
} from '$lib/api/shopify/mutations/AddLineItemsMutation.js';
import { createCartMutation } from '$lib/api/shopify/mutations/CreateCartMutation.js';
import { createCartWithBuyerIdentityMutation } from '$lib/api/shopify/mutations/CreateCartWithBuyerIdentityMutation.js';
import {
	getProductVariantsQuery,
	type GetProductVariantsResponse
} from '$lib/api/shopify/queries/GetProductVariantsQuery.js';
import type { Cart, CartLineAddInput } from '$lib/api/storefront-api.types.js';
import { createStorefrontApiClient } from '$lib/utils/generators/storefront-api-client.js';

const DEBUG = false;

export const storefrontApi = () => {
	const client = createStorefrontApiClient();

	/**
	 * API calls
	 * */
	const createCart = async (): Promise<Cart> => {
		const { data, errors } = await client.request(createCartMutation);

		if (errors) {
			console.error(errors);
			throw new Error('Failed to create cart');
		}

		if (data?.cartCreate?.userErrors?.length > 0) {
			throw new Error(data.cartCreate.userErrors[0].message);
		}

		return data?.cartCreate?.cart;
	};

	const createCartWithBuyerIdentity = async (buyerIdentity: string): Promise<Cart> => {
		const { data, errors } = await client.request(createCartWithBuyerIdentityMutation, {
			variables: {
				buyerIdentity: {
					countryCode: buyerIdentity
				}
			}
		});

		if (errors) {
			console.error(errors);
			throw new Error('Failed to create cart');
		}

		if (data?.cartCreate?.userErrors?.length > 0) {
			throw new Error(data.cartCreate.userErrors[0].message);
		}

		return data?.cartCreate?.cart;
	};

	const addLineItems = async (cartId: string, lines: CartLineAddInput[]) => {
		if (!cartId) throw new Error('cartId is required');
		if (!lines || !lines.length) throw new Error('lines are required');

		const { data, errors } = await client.request<AddLineItemsMutationResponse>(
			addLineItemsMutation,
			{
				variables: {
					cartId,
					lines: lines.map((line) => ({
						merchandiseId: line.variantGid,
						quantity: line.quantity
					}))
				}
			}
		);

		if (errors) {
			console.error(errors);
			console.error(errors.graphQLErrors);
			throw new Error('Error adding line items to cart');
		}

		if (data?.cartLinesAdd?.userErrors?.length) {
			throw new Error(data.cartLinesAdd.userErrors[0].message);
		}

		return data?.cartLinesAdd?.cart;
	};

	const getPreOrderMessage = async (productHandle: string, variantId?: number) => {
		if (!productHandle) throw new Error('variantId is required');
		if (!variantId) throw new Error('variantId is required');

		const { data, errors } = await client.request<GetProductVariantsResponse>(
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
	};

	return {
		createCart,
		createCartWithBuyerIdentity,
		addLineItems,
		getPreOrderMessage
	};
};
