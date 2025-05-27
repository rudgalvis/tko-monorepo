export const getAvailableVariantsByProductByIdQuery = `
query getProductVariants($id: ID!) {
  product(id: $id) {
    id
    title
    variants(first: 10) {
      edges {
        node {
          id
          title
          availableForSale
        }
      }
    }
  }
}
`;

export type GetAvailableVariantsByProductByIdResponse = {
	product: {
		id: string;
		title: string;
		variants: {
			edges: {
				node: {
					id: string;
					title: string;
					availableForSale: boolean;
				};
			}[];
		};
	};
};
