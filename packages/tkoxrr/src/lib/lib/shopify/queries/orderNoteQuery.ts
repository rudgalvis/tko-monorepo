// Query definition
export const orderNoteQuery = `
query orderById($id: ID!) {
  order(id: $id) {
    id
    note
  }
}
`;

// Input type for the query
export interface OrderByIdInput {
	id: string;
}

// Response type for the query
export interface OrderByIdResponse {
	order: {
		id: string;
		note: string;
	};
}
