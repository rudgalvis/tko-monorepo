export enum ObjectsGIDS {
	ORDER = 'gid://shopify/Order',
	PRODUCT = 'gid://shopify/Product',
	PRODUCT_VARIANT = 'gid://shopify/ProductVariant',
}
export const gidGenerator = (object: ObjectsGIDS, id: number) => {
	return `${object}/${id}`
}

export const generateVariantGid = (variantId: number): string =>
	gidGenerator(ObjectsGIDS.PRODUCT_VARIANT, variantId)
