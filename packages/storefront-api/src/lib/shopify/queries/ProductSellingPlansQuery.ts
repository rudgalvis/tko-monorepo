export const productSellingPlansQuery = `
    query ProductSellingPlans($productId: ID!) {
      product(id: $productId) {
        sellingPlanGroups(first: 10) {
          nodes {
            name
            sellingPlans(first: 10) {
              nodes {
                id
                name
                description
                options {
                  name
                  value
                }
                billingPolicy {
                  ... on SellingPlanRecurringBillingPolicy {
                    interval
                    intervalCount
                  } 
                }
                priceAdjustments {
                  adjustmentValue {
                    ... on SellingPlanFixedAmountPriceAdjustment {
                      adjustmentAmount {
                        amount
                        currencyCode
                      }
                    }
                    ... on SellingPlanFixedPriceAdjustment {
                      price {
                        amount
                        currencyCode
                      }
                    }
                    ... on SellingPlanPercentagePriceAdjustment {
                      adjustmentPercentage
                    }
                  }
                }
                recurringDeliveries
                checkoutCharge {
                  value {
                    ... on MoneyV2 {
                      amount
                      currencyCode
                    }
                    ... on SellingPlanCheckoutChargePercentageValue {
                      percentage
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
