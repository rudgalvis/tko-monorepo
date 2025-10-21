import type { BaseCurrencyRatesRepositoryInterface } from '$lib/currency-rates/repositories/BaseCurrencyRatesRepositoryInterface.js';
//@ts-expect-error - package has no types
import Api from '@everapi/currencyapi-js';

export class FreeCurrencyApiRepository implements BaseCurrencyRatesRepositoryInterface {
	private api: Api;

	constructor(apiKey: string) {
		this.api = new Api(apiKey);
	}

	async getRates(baseCurrency: string, currencies: string[]) {
		if (!baseCurrency) throw new Error('baseCurrency is required');
		if (!currencies) throw new Error('currencies is required');

		const { data } = await this.api.latest({
			base_currency: baseCurrency,
			currencies: currencies.join(',')
		});

		const r: Record<string, number> = {}

		Object.keys(data).map(key => {
			r[key] = data[key].value
		})

		return r;
	}
}
