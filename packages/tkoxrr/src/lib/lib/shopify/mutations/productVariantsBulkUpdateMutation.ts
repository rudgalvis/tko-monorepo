import { ProductVariantInventoryPolicy } from '$lib/shopify/types/enums/ProductVariantInventoryPolicy';

export const productVariantsBulkUpdate = `
mutation productVariantsBulkUpdate($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
  productVariantsBulkUpdate(productId: $productId, variants: $variants) {
    product {
      id
    }
    productVariants {
      id
    }
    userErrors {
      field
      message
    }
  }
}`;

export type ProductVariantsBulkUpdateInput = {
	productId: string; // For GraphQL ID type
	variants: ProductVariantsBulkInput[];
};

type ProductVariantsBulkInput = {
	id: string;
	inventoryPolicy: ProductVariantInventoryPolicy;
};

type MetafieldEdge = {
	node: {
		namespace: string;
		key: string;
		value: string;
	};
};

type MetafieldConnection = {
	edges: MetafieldEdge[];
};

export type ProductVariantsBulkUpdateReturn = {
	productVariantsBulkUpdate: {
		product: {
			id: string;
		};
		productVariants: {
			id: string;
			metafields: MetafieldConnection;
		}[];
		userErrors: {
			field: string[];
			message: string;
		}[];
	};
};
