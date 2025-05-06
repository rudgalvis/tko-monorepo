export const automaticDiscountNodesQuery = `
{
    discountNodes(first: 100, query: "discount_class:product AND method:automatic AND status:active", sortKey: CREATED_AT, reverse: true) {
      edges {
        node {
          id
          discount {
            ... on DiscountAutomaticApp {
              title
              status
              appDiscountType {
                appKey
                functionId
              }
            }
            ... on DiscountAutomaticBasic {
              title
              status
            }
            ... on DiscountAutomaticBxgy {
              title
              status
            }
            ... on DiscountAutomaticFreeShipping {
              title
              status
            }
          }
        }
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
