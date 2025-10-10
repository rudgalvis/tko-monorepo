export const getProduct = `
query getProduct($id: ID!) {
  product(id: $id) {
    id
    title
  }
}
`;

export type GetProduct = {
	product: {
		id: string;
		title: string;
	};
};
