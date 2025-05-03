export const createCartMutation = `
  mutation CreateCart {
    cartCreate {
      cart {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`
