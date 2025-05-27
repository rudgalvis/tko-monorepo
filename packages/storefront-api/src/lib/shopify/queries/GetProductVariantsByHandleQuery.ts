export const getProductVariantsByHandleQuery = `
query getProductVariants($handle: String!) {
  productByHandle(handle: $handle) {
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
