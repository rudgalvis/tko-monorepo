import { ProductVariantInventoryPolicy } from '$lib/shopify/types/ProductVariantInventoryPolicy';

export const productVariantsBulkCreateMutation = `
mutation ProductVariantsCreate($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
  productVariantsBulkCreate(productId: $productId, variants: $variants) {
    productVariants {
      id
      title
      selectedOptions {
        name
        value
      }
    }
    userErrors {
      field
      message
    }
  }
}`;

export type ProductVariantsBulkCreateInput = {
	productId: string; // For ID! type
	variants: ProductVariantsBulkInput[]; // For [ProductVariantsBulkInput!]!
};

type ProductVariantsBulkInput = {
	// We need to define the properties that go into creating a product variant
	title?: string;
	optionValues?: {
		name: string;
		optionId: string;
	}[];
	inventoryPolicy?: ProductVariantInventoryPolicy;
	inventoryQuantities?: {
		availableQuantity: number;
		locationId: string;
	};
	price?: string;
	compareAtPrice?: string;
	sku?: string;
	// Add other relevant fields based on your specific needs
};

export type ProductVariantsBulkCreateReturn = {
	productVariantsBulkCreate: {
		productVariants: {
			id: string;
			title: string;
			selectedOptions: {
				name: string;
				value: string;
			}[];
		}[];
	};
	userErrors: {
		field: string;
		message: string;
	}[];
};
