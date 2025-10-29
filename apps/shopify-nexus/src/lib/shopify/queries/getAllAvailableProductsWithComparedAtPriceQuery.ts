export const getAllAvailableProductsWithComparedAtPriceQuery = `
query getAllAvailableProductsWithComparedAtPrice($first: Int!, $after: String) {
  products(first: $first, after: $after) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
        id
        status
        variants(first: 100) {
          edges {
            node {
              id
              availableForSale
              price
              compareAtPrice
            }
          }
        }
      }
    }
  }
}
`;

export type GetAllAvailableProductsWithComparedAtPriceResponse = {
  products: {
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor: string | null;
      endCursor: string | null;
    };
    edges: {
      node: {
        id: string;
        status: 'ACTIVE' | 'DRAFT' | 'ARCHIVED';
        variants: {
          edges: {
            node: {
              id: string;
              availableForSale: boolean;
              price: string;
              compareAtPrice: string | null;
            };
          }[];
        };
      };
    }[];
  };
};

export type GetAllAvailableProductsWithComparedAtPriceVars = {
  first: number;
  after?: string;
};
