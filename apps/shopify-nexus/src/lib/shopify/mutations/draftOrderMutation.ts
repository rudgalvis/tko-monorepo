export const draftOrderMutation = `
mutation createTestDraftOrder($variantId: ID!) {
  draftOrderCreate(
    input: {
      lineItems: [
        {
          variantId: $variantId,
          quantity: 1
        }
      ]
    }
  ) {
    draftOrder {
      id
      subtotalPrice
      totalPrice
      lineItems(first: 10) {
        edges {
          node {
            title
            quantity
            originalUnitPrice
            discountedUnitPrice
            discountedTotal
            appliedDiscount {
              title
              description
              value
              valueType
            }
          }
        }
      }
    }
    userErrors {
      field
      message
    }
  }
}
`;

export type DraftOrderInput = {
    variantId: string; // ID! in GraphQL maps to string in TypeScript
};

