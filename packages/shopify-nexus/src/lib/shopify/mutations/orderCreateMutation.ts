export const orderCreateMutation = `
mutation OrderCreate($order: OrderCreateOrderInput!, $options: OrderCreateOptionsInput) {
  orderCreate(order: $order, options: $options) {
    userErrors {
      field
      message
    }
    order {
      id
      totalTaxSet {
        shopMoney {
          amount
          currencyCode
        }
      }
      lineItems(first: 5) {
        nodes {
          variant {
            id
          }
          id
          title
          quantity
          taxLines {
            title
            rate
            priceSet {
              shopMoney {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
}`;

type Money = {
	amount: number;
	currencyCode: string;
};

type MoneySet = {
	shopMoney: Money;
};

type TaxLine = {
	priceSet: MoneySet;
	rate: number;
	title: string;
};

export type OrderInputLineItem = {
	variantId: string;
	quantity: number;
};

type Transaction = {
	locationId: string;
	gateway: string;
	kind: 'SALE';
	status: 'SUCCESS';
	amountSet: MoneySet;
};

// An existing customer to associate with the order, specified by ID.
type OrderCreateAssociateCustomerAttributesInput = {
	email?: string;
};

// A new customer to create or update and associate with the order.
type OrderCreateUpsertCustomerAttributesInput = {
	email?: string;
	firstName?: string;
};

type OrderCreateCustomerInput = {
	toAssociate?: OrderCreateAssociateCustomerAttributesInput;
	toUpsert?: OrderCreateUpsertCustomerAttributesInput;
};

type Order = {
	fulfillment?: {
		locationId: string;
		shipmentStatus: string;
	};
    note?: string,
	customer?: OrderCreateCustomerInput;
	currency: string;
	lineItems: OrderInputLineItem[];
	transactions: Transaction[];
	fulfillmentStatus?: string;
};

export type OrderInput = {
	options: any;
	order: Order;
};
