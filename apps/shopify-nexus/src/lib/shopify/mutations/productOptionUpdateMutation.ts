export const productOptionUpdateMutation = `
mutation updateOption($productId: ID!, $option: OptionUpdateInput!, $optionValuesToAdd: [OptionValueCreateInput!], $optionValuesToUpdate: [OptionValueUpdateInput!], $optionValuesToDelete: [ID!], $variantStrategy: ProductOptionUpdateVariantStrategy) {
  productOptionUpdate(productId: $productId, option: $option, optionValuesToAdd: $optionValuesToAdd, optionValuesToUpdate: $optionValuesToUpdate, optionValuesToDelete: $optionValuesToDelete, variantStrategy: $variantStrategy) {
    userErrors {
      field
      message
      code
    }
    product {
      id
      options {
        id
        name
        values
        position
        optionValues {
          id
          name
          hasVariants
        }
      }
      variants(first: 5) {
        nodes {
          id
          title
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
}`;

type OptionUpdateInput = {
	id: string;
	name?: string;
	position?: number;
};

type OptionValueCreateInput = {
	name: string;
};

type OptionValueUpdateInput = {
	id: string;
	name: string;
};

enum ProductOptionUpdateVariantStrategy {
	RECREATE = 'RECREATE',
	MAINTAIN = 'MAINTAIN'
}

export type ProductOptionUpdateVars = {
	productId: string;
	option: OptionUpdateInput;
	optionValuesToAdd?: OptionValueCreateInput[];
	optionValuesToUpdate?: OptionValueUpdateInput[];
	optionValuesToDelete?: string[];
	variantStrategy?: ProductOptionUpdateVariantStrategy;
};

type UserError = {
	field: string;
	message: string;
	code: string;
};

type SelectedOption = {
	name: string;
	value: string;
};

type Variant = {
	id: string;
	title: string;
	selectedOptions: SelectedOption[];
};

type OptionValue = {
	id: string;
	name: string;
	hasVariants: boolean;
};

type Option = {
	id: string;
	name: string;
	values: string[];
	position: number;
	optionValues: OptionValue[];
};

type Product = {
	id: string;
	options: Option[];
	variants: {
		nodes: Variant[];
	};
};

type ProductOptionUpdateResponse = {
	userErrors: UserError[];
	product: Product;
};

export type ProductOptionUpdateReturn = {
	productOptionUpdate: ProductOptionUpdateResponse;
};
