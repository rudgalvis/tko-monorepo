export const isShopifyOnWindow = () => {
	if(typeof window.Shopify !== 'undefined') return true;

	return false;
};