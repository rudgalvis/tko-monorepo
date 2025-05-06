export const currencyQuery = `
{
  shop {
    currencyCode
  }
}
`;

export type CurrencyReturn = {
	shop: {
		currencyCode: string;
	};
};
