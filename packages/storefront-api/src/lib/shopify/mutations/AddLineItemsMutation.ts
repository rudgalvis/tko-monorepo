export const addLineItemsMutation = `
mutation AddLineItems($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart {
      id
      totalQuantity
      lines(first: 50) {
        nodes {
          id
          quantity
				discountAllocations {
       			discountedAmount {
       				amount
       			}
          }
          merchandise {
            ... on ProductVariant {
              id
            }
          }
        }
      }
    }
    userErrors {
      message
    }
  }
}
`;

export type AddLineItemsMutationResponse = {
	cartLinesAdd: {
		cart: {
			id: string;
			totalQuantity: number;
			lines: {
				nodes: Array<{
					id: string;
					quantity: number;
					discountAllocations: Array<{
						discountedAmount: {
							amount: number;
						};
					}>;
					merchandise: {
						id: string; // For ProductVariant
					};
				}>;
			};
		};
		userErrors: Array<{
			message: string;
		}>;
	};
};
