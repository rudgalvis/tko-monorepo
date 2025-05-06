export const codeDiscountNodesQuery = `{
codeDiscountNodes(first: 200, sortKey: CREATED_AT, reverse: true) {
    edges {
      node {
        id
        codeDiscount {
          __typename
          ... on DiscountCodeApp {
            title
            appDiscountType {
              appKey
              functionId
            }
            codes(first: 5) {
              edges {
                node {
                  code
                }
              }
            }
            status
            createdAt
          }
          ... on DiscountCodeBasic {
            title
            summary
            codes(first: 5) {
              edges {
                node {
                  code
                }
              }
            }
            status
            startsAt
            endsAt
            createdAt
          }
          ... on DiscountCodeBxgy {
            title
            summary
            codes(first: 5) {
              edges {
                node {
                  code
                }
              }
            }
            status
            startsAt
            endsAt
            createdAt
          }
          ... on DiscountCodeFreeShipping {
            title
            summary
            codes(first: 5) {
              edges {
                node {
                  code
                }
              }
            }
            status
            startsAt
            endsAt
            createdAt
          }
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
  `;

type AutomaticDiscount = {
	id: string;
	automaticDiscount: {
		title: string;
		status: string;
	};
};

type AutomaticDiscountEdge = {
	node: AutomaticDiscount;
};

export type AutomaticDiscountNodesQueryReturn = {
	automaticDiscountNodes: {
		edges: AutomaticDiscountEdge[];
	};
};
