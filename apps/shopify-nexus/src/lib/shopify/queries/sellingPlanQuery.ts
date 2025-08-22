export const sellingPlanQuery = `
query {
  sellingPlanGroups(first: 10) {
    edges {
      node {
        id
        name
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
  }
}
`

export type SellingPlanResponseReturn = {
	sellingPlan: {
		id: string;
		name: string;
		description: string | null;
		options: string[];
		position: number;
		recurringDeliveries: boolean;
		priceAdjustments: Array<{
			adjustmentType: string;
			adjustmentValue:
				| { adjustmentAmount: { amount: string; currencyCode: string } }
				| { price: { amount: string; currencyCode: string } }
				| { adjustmentPercentage: number };
			orderCount: number | null;
		}>;
		billingPolicy: {
			interval: string;
			intervalCount: number;
			minCycles: number | null;
			maxCycles: number | null;
		};
		deliveryPolicy: {
			interval: string;
			intervalCount: number;
		};
		category: string;
		createdAt: string;
		inventoryPolicy: {
			reserve: string;
		};
	};
};