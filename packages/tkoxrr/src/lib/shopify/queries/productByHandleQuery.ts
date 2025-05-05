export const productByHandleQuery = `
  query productByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
    }
  }
`;

export type ProductByHandleVars = { handle: string };

export type ProductByHandleReturn = {
	productByHandle: {
		id: string;
		title: string;
	};
};
