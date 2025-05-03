export const orderAddNoteMutation = `
mutation OrderUpdate($input: OrderInput!) {
  orderUpdate(input: $input) {
    order {
      id
      note
    }
    userErrors {
      field
      message
    }
  }
}
`;

// Input type for the mutation
export interface OrderAddNoteInput {
	id: string; // GraphQL ID type is represented as string in TypeScript
	note: string;
}

// Response type for the mutation
export interface OrderAddNoteResponse {
	orderUpdate: {
		order: {
			id: string;
			note: string;
		};
		userErrors: {
			field: string;
			message: string;
		}[];
	};
}
