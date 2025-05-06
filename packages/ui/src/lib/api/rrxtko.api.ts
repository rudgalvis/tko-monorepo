const BASE_URL = 'https://rrxtko.tko.rudgalvis.com/api';

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
