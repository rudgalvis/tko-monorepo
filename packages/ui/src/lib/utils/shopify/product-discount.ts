import { storefrontApi } from '$lib/api/storefront-api.js';

export const getProductDiscount = async (
	countryCode: string,
	variantId: number
): Promise<number> => {
	const { id } = await storefrontApi().createCartWithBuyerIdentity(countryCode);

	const cart = await storefrontApi().addLineItems(id, [
		{
			variantGid: `gid://shopify/ProductVariant/${variantId}`,
			quantity: 1
		}
	]);

	return cart?.lines.nodes[0]?.discountAllocations[0]?.discountedAmount.amount || 0;
};
