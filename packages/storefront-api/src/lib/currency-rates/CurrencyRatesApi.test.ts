import { CurrencyRatesApi } from "$lib/currency-rates/CurrencyRatesApi.js";
import {test} from 'vitest'

test('Fetch currency rates', async () => {
    const currencyRatesApi = new CurrencyRatesApi()

    const a = await currencyRatesApi.getRates('EUR', ['USD', 'AUD'])
    console.log(a)
})