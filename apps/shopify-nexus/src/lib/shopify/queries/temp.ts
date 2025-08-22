export const tempQuery = `
query getProductWithSellingPlans($id: ID!) {
  product(id: $id) {
    id
    title
    handle
    description
    status
    productType
    vendor
    tags
    createdAt
    updatedAt
    
    # Product variants
    variants(first: 10) {
      edges {
        node {
          id
          title
          price
          compareAtPrice
          sku
          inventoryQuantity
          availableForSale
          selectedOptions {
            name
            value
          }
        }
      }
    }
    
    # Selling plan groups attached to the product
    sellingPlanGroups(first: 10) {
      edges {
        node {
          id
          name
          merchantCode
          description
          options
          position
          
          # Selling plans within the group
          sellingPlans(first: 10) {
            edges {
              node {
                id
                name
                description
                options
                position
                billingPolicy {
                  ... on SellingPlanRecurringBillingPolicy {
                    interval
                    intervalCount
                    minCycles
                    maxCycles
                  }
                }
                deliveryPolicy {
                  ... on SellingPlanRecurringDeliveryPolicy {
                    interval
                    intervalCount
                  }
                }
                pricingPolicies {
                  ... on SellingPlanFixedPricingPolicy {
                    adjustmentType
                    adjustmentValue {
                      ... on SellingPlanPricingPolicyPercentageValue {
                        percentage
                      }
                      ... on MoneyV2 {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`