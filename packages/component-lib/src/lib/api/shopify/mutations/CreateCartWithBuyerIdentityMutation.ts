export const createCartWithBuyerIdentityMutation = `
mutation createCartWithBuyerIdentity($buyerIdentity: CartBuyerIdentityInput!) {
  cartCreate(
    input: {
      buyerIdentity: $buyerIdentity
    }
  ) {
    cart {
      id
      checkoutUrl
      buyerIdentity {
        countryCode
        email
        phone
      }
    }
    userErrors {
      field
      message
    }
  }
}
`;
