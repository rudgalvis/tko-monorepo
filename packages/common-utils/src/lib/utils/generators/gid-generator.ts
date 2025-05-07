export enum ObjectGIDs {
	ORDER = 'gid://shopify/Order',
	PRODUCT = 'gid://shopify/Product',
	PRODUCT_VARIANT = 'gid://shopify/ProductVariant',
}
export const gidGenerator = (object: ObjectGIDs, id: number) => {
	return `${object}/${id}`
}

export const generateVariantGid = (variantId: number): string =>
	gidGenerator(ObjectGIDs.PRODUCT_VARIANT, variantId)
