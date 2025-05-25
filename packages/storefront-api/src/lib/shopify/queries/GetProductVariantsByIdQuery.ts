export const getProductVariantsByIdQuery = `
query getProductVariants($id: ID!) {
  product(id: $id) {
    id
    title
    variants(first: 10) {
      edges {
        node {
          id
          title
          sku
          metafield(namespace: "preorder", key: "preordercontent") {
						value
						id
					}
        }
      }
    }
  }
}
`;

export type GetProductVariantsResponse = {
	productByHandle: {
		id: string;
		title: string;
		variants: {
			edges: {
				node: {
					id: string;
					title: string;
					metafield: {
						value: string;
						id: string;
					} | null;
				};
			}[];
		};
	};
};
