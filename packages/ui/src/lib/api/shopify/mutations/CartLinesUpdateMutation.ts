export const cartLinesUpdateMutation = `
mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
  cartLinesUpdate(cartId: $cartId, lines: $lines) {
    cart {
      id
    }
    userErrors {
      field
      message
    }
  }
}`
