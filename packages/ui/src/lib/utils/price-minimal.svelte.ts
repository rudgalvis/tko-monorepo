import { NexusApi } from 'storefront-api';

type Input = {
	price: string; // 10€, €10
	compared_at?: string; // 10€, €10, nodiscount
	iso_code?: string; // LT, AU, ...
	variant_id?: string; // numeric
	product_id?: string; // numeric
	displayCurrency: string | null; // EUR, USD, ...
	marketCurrency: string | null; // EUR, USD, ...
	currencyRates: Record<string, number> | null;
};

type PriceStrCouple = {
	price: string;
	comparedAt?: string;
};

const normalized = $state<PriceStrCouple>({
	price: '',
	comparedAt: undefined
});

export const priceMinimalSvelte = ({
	price: inputPrice,
	compared_at: inputComparedAt,
	iso_code: market,
	variant_id,
	displayCurrency,
	marketCurrency,
	currencyRates
}: Input) => {
	const nexusApi = new NexusApi();


	const autoDiscountApplied = $state<PriceStrCouple>({
		price: inputPrice,
		comparedAt: inputPrice
	});

	const final = $state<PriceStrCouple>({
		price: '-1',
		comparedAt: undefined
	});

	$effect(() => {
		if(!currencyRates) return

		console.log('we got currency rates', currencyRates)

		normalized.price = '123123'
	})

	return {
		get something() {
			return normalized.price
		}
	};
};
