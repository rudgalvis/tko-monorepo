export const productDeleteMutation = `
mutation ProductDelete($id: ID!) {
  productDelete(input: {id: $id}) {
    deletedProductId
    userErrors {
      field
      message
    }
  }
}`;

export type ProductDeleteInput = {
	id: string;
};

export type ProductDeleteReturn = {
	productDelete: {
		deletedProductId: string;
		userErrors: {
			field: string;
			message: string;
		}[];
	};
};
