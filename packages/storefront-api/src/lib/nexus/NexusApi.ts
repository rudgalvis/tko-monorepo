import { PUBLIC_NEXUS_BASE_URL } from '$env/static/public';

export class NexusApi {
	private readonly BASE_URL = PUBLIC_NEXUS_BASE_URL;
	private readonly API_VERSION_PATH = 'api';

    private readonly API_ROUTES = {
		GET_AUTOMATIC_DISCOUNT: (isoCode: string, variantId: number) =>
			`automatic-discount/${isoCode}/${variantId}`,
		GET_CURRENCY_RATES: (baseMarket: string) =>
			`currency-rates/${baseMarket}`
	};

    async getAutomaticDiscount(market: string, variantId: number) {
        const response = await fetch(
            `${this.BASE_URL}/${this.API_VERSION_PATH}/${this.API_ROUTES.GET_AUTOMATIC_DISCOUNT(market, variantId)}`,
            { method: 'GET' }
        );

        try {
            return await response.json();
        } catch (e) {
            console.error(e);
        }
    };

    async getCurrencyRates(market: string): Promise<Record<string, number> | null> {
        const response = await fetch(
            `${this.BASE_URL}/${this.API_VERSION_PATH}/${this.API_ROUTES.GET_CURRENCY_RATES(market)}`,
            { method: 'GET' }
        );

        try {
            return await response.json();
        } catch (e) {
            console.error(e);

            return null
        }
    };
}
