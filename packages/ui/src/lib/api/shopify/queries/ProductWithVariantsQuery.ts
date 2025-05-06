export const productWithVariantsQuery = `
 query ProductQuery($productId: ID!) {
  product(id: $productId)  {
    id
    title
    variants(first: 10) {
       nodes {
        id
        sku
        title
        availableForSale
        compareAtPrice {
          amount
          currencyCode
        }
        description: metafield(namespace: "custom", key: "short_description") {
          value
        }
        price {
          amount
          currencyCode
        }
        image {
           url(transform: {maxWidth: 200, maxHeight: 200})
        }
      }
    }
  }
}
`
