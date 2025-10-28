import { PUBLIC_NEXUS_BASE_URL, PUBLIC_ENV } from '$env/static/public';

export class NexusApi {
	private readonly BASE_URL = PUBLIC_NEXUS_BASE_URL;
	private readonly API_VERSION_PATH = 'api';
	private readonly NGROK_SKIP_HEADER: object =
		PUBLIC_ENV === 'DEVELOPMENT' ? { 'ngrok-skip-browser-warning': 'true' } : {};

	private readonly API_ROUTES = {
		GET_VARIANT_AUTOMATIC_DISCOUNT: (isoCode: string, variantId: number) =>
			`automatic-discount/${isoCode}/${variantId}`,
		GET_PRODUCT_AUTOMATIC_DISCOUNT: (isoCode: string, productId: number) =>
			`automatic-discount/product/${isoCode}/${productId}`,
		GET_CURRENCY_RATES: (baseMarket: string) => `currency-rates/${baseMarket}`,
		CACHE_PRODUCT_PRICES: () => `products/cache-prices`,
		GET_AVAILABLE_VARIANT_IDS: () => `products/get-available-variant-ids`
	};

	async getVariantAutomaticDiscount(market: string, variantId: number, signal?: AbortSignal): Promise<{amount: number} | undefined> {
		const response = await fetch(
			`${this.BASE_URL}/${this.API_VERSION_PATH}/${this.API_ROUTES.GET_VARIANT_AUTOMATIC_DISCOUNT(market, variantId)}`,
			{
				method: 'GET',
				headers: {
					...this.NGROK_SKIP_HEADER
				},
				signal
			}
		);

		if(!response.ok) {
			throw new Error(`Failed to get variant automatic discount: ${response.statusText}. Querying: ${this.BASE_URL}/${this.API_VERSION_PATH}/${this.API_ROUTES.GET_VARIANT_AUTOMATIC_DISCOUNT(market, variantId)}`);
		}

		try {
			return await response.json();
		} catch (e) {
			console.error(e)

			return undefined
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

	async cacheProductPrices(): Promise<unknown | null> {
		try {
			const response = await fetch(
				`${this.BASE_URL}/${this.API_VERSION_PATH}/${this.API_ROUTES.CACHE_PRODUCT_PRICES()}`,
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

	async getAvailableVariantIds(): Promise<string[] | null> {
		try {
			const response = await fetch(
				`${this.BASE_URL}/${this.API_VERSION_PATH}/${this.API_ROUTES.GET_AVAILABLE_VARIANT_IDS()}`,
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
