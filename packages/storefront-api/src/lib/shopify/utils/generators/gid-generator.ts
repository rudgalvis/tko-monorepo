export enum ObjectsGIDS {
	ORDER = 'gid://shopify/Order',
	PRODUCT = 'gid://shopify/Product',
	PRODUCT_VARIANT = 'gid://shopify/ProductVariant',
}
export const gidGenerator = (object: ObjectsGIDS, id: number) => {
	return `${object}/${id}`
}

export const gidToNumericId = (gid: string): number => {
	const parts = gid.split('/');
	const numericId = parts[parts.length - 1];
	return parseInt(numericId, 10);
}

export const generateVariantGid = (variantId: number): string =>
	gidGenerator(ObjectsGIDS.PRODUCT_VARIANT, variantId)

export const generateProductGid = (productId: number): string =>
	gidGenerator(ObjectsGIDS.PRODUCT, productId)
