export enum DiscountType {
	AUTOMATIC = 'AUTOMATIC', // From automatic discount or app
	NATIVE = 'NATIVE', // From native discount, that is set through shopify's admin comparedAt price
	NONE = 'NONE'
}

export type FinalVariantPrice = {
	price: number;
	comparedAt: number | null;
	discountType: DiscountType;
};
