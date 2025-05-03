export const productByHandleQuery = `
  query productByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      productType
      description
      vendor
    }
  }
`;

export type ProductByHandleVars = { handle: string };

export type ProductByHandleReturn = {
	productByHandle: {
		id: string;
		title: string;
		productType: string;
		description: string;
		vendor: string;
	};
};
