export interface BaseCurrencyRatesRepositoryInterface {
    getRates(baseCurrency: string, currencies: string[]): Promise<Record<string, number>>;
}