export const getAllAvailableVariantsQuery = `
query getAllAvailableVariants($first: Int!, $after: String) {
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
        title
        handle
        variants(first: 10) {
          edges {
            node {
              id
              title
              sku
              availableForSale
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
              image {
                url(transform: {maxWidth: 200, maxHeight: 200})
              }
            }
          }
        }
      }
    }
  }
}
`;

export type GetAllAvailableVariantsResponse = {
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
        title: string;
        handle: string;
        variants: {
          edges: {
            node: {
              id: string;
              title: string;
              sku: string | null;
              availableForSale: boolean;
              price: {
                amount: string;
                currencyCode: string;
              };
              compareAtPrice: {
                amount: string;
                currencyCode: string;
              } | null;
              image: {
                url: string;
              } | null;
            };
          }[];
        };
      };
    }[];
  };
};

export type GetAllAvailableVariantsVars = {
  first: number;
  after?: string;
};


