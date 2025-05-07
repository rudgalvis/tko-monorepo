const BASE_URL = 'http://172.20.10.6:5173/api';

const API_ROUTES = {
	GET_AUTOMATIC_DISCOUNT: (isoCode: string, variantId: number) =>
		`automatic-discount/${isoCode}/${variantId}`
};

export const getAutomaticDiscount = async (isoCode: string, variantId: number) => {
	const response = await fetch(
		`${BASE_URL}/${API_ROUTES.GET_AUTOMATIC_DISCOUNT(isoCode, variantId)}`,
		{ method: 'GET' }
	);

	try {
		return await response.json();
	} catch (e) {
		console.error(e);
	}
};
