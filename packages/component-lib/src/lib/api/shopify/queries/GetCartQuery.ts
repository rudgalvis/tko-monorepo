export const getCartQuery = `
query GetCart($cartId: ID!) {
  cart(id: $cartId) {
    id
    totalQuantity
    checkoutUrl
    cost {
      totalAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 50) {
      nodes {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            price {
              amount
              currencyCode
            }
            image {
              url(transform: {maxWidth: 200, maxHeight: 200})
            }
            product {
              title
            }
          }
        }
        sellingPlanAllocation {
          sellingPlan {
            id
          }
        }
      }
    }
  }
}
`
