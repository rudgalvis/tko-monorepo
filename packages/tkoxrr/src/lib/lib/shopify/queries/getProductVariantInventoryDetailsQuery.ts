import type { ProductVariantInventoryDetails } from '$lib/shopify/types/ProductVariantInventoryDetails'

export const getProductVariantInventoryDetailsQuery = `
  query getProductVariantsByIds($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on ProductVariant {
      	product {
      		id
      		title
      	}
        id
        title
        inventoryQuantity
        inventoryPolicy
        inventoryItem {
        	id
        }
        expectedDate: metafield(key: "custom.estimated_pre_order_shipping_date") {
        	value
        }
        maximumPreSale: metafield(key: "custom.pre_order_limit") {
        	value
        }
      }
    }
  }`

export type ProductVariantInventoryDetailsResponse = { nodes: ProductVariantInventoryDetails }
