import { PUBLIC_NEXUS_BASE_URL } from '$env/static/public';
import { dev } from '$app/environment';

export class NexusApi {
	private readonly BASE_URL = PUBLIC_NEXUS_BASE_URL;
	private readonly API_VERSION_PATH = 'api';
	private readonly NGROK_SKIP_HEADER = { 'ngrok-skip-browser-warning': dev ? 'true' : 'false' };

	private readonly API_ROUTES = {
		GET_VARIANT_AUTOMATIC_DISCOUNT: (isoCode: string, variantId: number) =>
			`automatic-discount/variant/${isoCode}/${variantId}`,
		GET_PRODUCT_AUTOMATIC_DISCOUNT: (isoCode: string, productId: number) =>
			`automatic-discount/product/${isoCode}/${productId}`,
		GET_CURRENCY_RATES: (baseMarket: string) => `currency-rates/${baseMarket}`
	};

	async getVariantAutomaticDiscount(market: string, variantId: number) {
		try {
			const response = await fetch(
				`${this.BASE_URL}/${this.API_VERSION_PATH}/${this.API_ROUTES.GET_VARIANT_AUTOMATIC_DISCOUNT(market, variantId)}`,
				{
					method: 'GET',
					headers: {
						...this.NGROK_SKIP_HEADER
					}
				}
			);

			return await response.json();
		} catch (e) {
			console.error(e);
		}
	}

	async getProductAutomaticDiscount(market: string, variantId: number) {
		try {
			const response = await fetch(
				`${this.BASE_URL}/${this.API_VERSION_PATH}/${this.API_ROUTES.GET_PRODUCT_AUTOMATIC_DISCOUNT(market, variantId)}`,
				{
					method: 'GET',
					headers: {
						...this.NGROK_SKIP_HEADER
					}
				}
			);

			return await response.json();
		} catch (e) {
			console.error(e);
		}
	}

	async getCurrencyRates(market: string): Promise<Record<string, number> | null> {
		try {
			const response = await fetch(
				`${this.BASE_URL}/${this.API_VERSION_PATH}/${this.API_ROUTES.GET_CURRENCY_RATES(market)}`,
				{
					method: 'GET',
					headers: {
						...this.NGROK_SKIP_HEADER
					}
				}
			);

			return await response.json();
		} catch (e) {
			console.error(e);

			return null;
		}
	}
}
