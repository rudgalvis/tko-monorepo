export const getProductIdFromVariantQuery = `
  query getProductIdFromVariant($id: ID!) {
    node(id: $id) {
      ... on ProductVariant {
        product {
          id
        }
      }
    }
  }`

export type GetProductIdFromVariantResponse = {
	node: {
		product: {
			id: string
		}
	} | null
}

