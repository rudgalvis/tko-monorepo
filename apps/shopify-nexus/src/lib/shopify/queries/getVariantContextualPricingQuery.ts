export const getVariantContextualPricingQuery = `
  query getVariantContextualPricing($id: ID!, $country: CountryCode!) {
    productVariant(id: $id) {
      id
      contextualPricing(context: { country: $country }) {
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
      }
    }
  }
`

export type GetVariantContextualPricingResponse = {
  productVariant: {
    id: string
    contextualPricing: {
      price: {
        amount: string
        currencyCode: string
      }
      compareAtPrice: {
        amount: string
        currencyCode: string
      } | null
    }
  }
}

export type GetVariantContextualPricingVars = {
  id: string
  country: string
}


