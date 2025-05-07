import type {
    BaseCurrencyRatesRepositoryInterface
} from "$lib/currency-rates/repositories/BaseCurrencyRatesRepositoryInterface.js";
import { FreeCurrencyApiRepository } from "$lib/currency-rates/repositories/FreeCurrencyApiRepository.js";

export class CurrencyRatesApi {
    private repository: BaseCurrencyRatesRepositoryInterface

    constructor(private apiKey: string) {
        this.repository = new FreeCurrencyApiRepository(this.apiKey)
    }

    getRates(baseCurrency: string, currencies: string[]): Promise<Record<string, number>> {
        return this.repository.getRates(baseCurrency, currencies)
    }
}