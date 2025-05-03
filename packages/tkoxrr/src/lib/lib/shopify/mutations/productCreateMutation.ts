export const productCreateMutation = `
mutation productCreate($input: ProductInput!) {
  productCreate(input: $input) {
    product {
      id
      title
      handle
      options {
        id
        name
        position
        optionValues {
          id
          name
          hasVariants
        }
      }
    }
    userErrors {
      field
      message
    }
  }
}
`

export type ProductCreateInput = {
	input: {
		title: string // Required
		productOptions?: {
			name: string
			values: {
				name: string
			}[]
		}[]
	}
}

type UserError = {
	field: string
	message: string
}

type OptionValue = {
	id: string
	name: string
	hasVariants: boolean
}

type Option = {
	id: string
	name: string
	position: number
	optionValues: OptionValue[]
}

type Product = {
	id: string
	title: string
	options: Option[]
}

type ProductCreateResponse = {
	product: Product
	userErrors: UserError[]
}

export type ProductCreateResult = {
	productCreate: ProductCreateResponse
}
