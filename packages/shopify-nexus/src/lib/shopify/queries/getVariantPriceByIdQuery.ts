export const getVariantPriceByIdQuery = `
query getVariantById($id: ID!, $country: CountryCode) {
  node(id: $id) {
    ... on ProductVariant {
      id
      title
      contextualPricing(context: {country: $country}) {
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
      }
      availableForSale
    }
  }
}
`;

export type GetVariantPriceByIdResponse = {
	node: {
		id: string;
		title: string;
		availableForSale: boolean;
		contextualPricing: {
			price: {
				amount: string;
				currencyCode: string;
			};
			compareAtPrice: {
				amount: string;
				currencyCode: string;
			} | null;
		};
	} | null;
};