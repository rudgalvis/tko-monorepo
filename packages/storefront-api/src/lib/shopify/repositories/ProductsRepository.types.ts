export type Variant = {
	id: string;
	title: string;
}

export type VariantAvailability = Variant & {
	availableForSale: boolean;
};

export type VariantPrice = VariantAvailability & {
	price: {
		amount: number;
		currencyCode: string;
	};
	compareAtPrice: {
		amount: number;
		currencyCode: string;
	} | null;
};
