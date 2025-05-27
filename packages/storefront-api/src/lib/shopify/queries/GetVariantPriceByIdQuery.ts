export const getVariantPriceByIdQuery = `
query getVariantById($id: ID!) {
  node(id: $id) {
    ... on ProductVariant {
      id
      title
      price {
        amount
        currencyCode
      }
      compareAtPrice {
        amount
        currencyCode
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
		price: {
			amount: string;
			currencyCode: string;
		};
		compareAtPrice: {
			amount: string;
			currencyCode: string;
		} | null;
	} | null;
};