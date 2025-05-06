export const productImagesQuery = `
   query ProductQuery($productId: ID!) {
    product(id: $productId)  {
      id
      images(first: 10) {
        nodes {
          url(transform: {maxHeight: 1400, maxWidth: 1400})
        }
      }
    }
  }
`
