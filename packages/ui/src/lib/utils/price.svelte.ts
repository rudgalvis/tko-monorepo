import {
	parseCurrencyString,
	subtractCurrencyStrings
} from '$lib/utils/formatters/price-formatter.js';
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

export const processPrice = ({
	price: inputPrice,
	compared_at: inputComparedAt,
	iso_code: market,
	variant_id,
	displayCurrency,
	marketCurrency,
	currencyRates
}: Input) => {
	const nexusApi = new NexusApi();

	const normalized = $state<PriceStrCouple>({
		price: '-1',
		comparedAt: undefined
	});

	const autoDiscountApplied = $state<PriceStrCouple>({
		price: '-1',
		comparedAt: undefined
	});

	const final = $state<PriceStrCouple>({
		price: '-1',
		comparedAt: undefined
	});

	let discountPercentage = $state<number | null>(null);

	$effect(() => {
		console.log('we got currency rates', currencyRates)
	})

	// Normalize input
	$effect(() => {
		// Step 1: Create temporary values to batch our changes
		// This prevents infinite loop by preparing values before state updates
		let price = inputPrice;
		let comparedAt = inputComparedAt;

		// Step 2: Normalize 'nodiscount' value coming from legacy code
		if (comparedAt === 'nodiscount' || !comparedAt) {
			comparedAt = undefined;
		}

		// Step 3: Fix faulty input by swapping values
		// (when the price is lower than compared_at)
		if (
			comparedAt &&
			parseCurrencyString(price).value === parseCurrencyString(comparedAt).value
		) {
			comparedAt = undefined;
		}

		// Step 4: Fix faulty input by swapping values
		// (when the price is lower than compared_at)
		if (
			comparedAt &&
			parseCurrencyString(price).value > parseCurrencyString(comparedAt).value
		) {
			[price, comparedAt] = [comparedAt, price];
		}

		// Final step: Update state once with all our changes
		normalized.price = price;
		normalized.comparedAt = comparedAt;
	});

	// Apply automatic discount if possible
	$effect(() => {
		// Hold normalized values even if a discount would not be applied
		autoDiscountApplied.price = normalized.price;
		autoDiscountApplied.comparedAt = normalized.comparedAt;

		if (!market) return;
		if (!variant_id) return;
		if (!normalized.price) return;
		if (normalized.comparedAt) return; // Only check if no regular compared at is present

		try {
			calculateAutomaticDiscount({ ...normalized }).then(({ price, comparedAt }) => {
				autoDiscountApplied.price = price;
				autoDiscountApplied.comparedAt = comparedAt;
			});
		} catch (e) {
			console.error(e);
		}
	});

	// Apply display currency changes
	$effect(() => {
		if (!displayCurrency) return;

		// Validate currency rates are available
		if (!currencyRates) return;

		// Create a formatter for the display currency
		const formatter = new Intl.NumberFormat(undefined, {
			style: 'currency',
			currency: displayCurrency, // 'EUR', 'USD', etc.
			currencySign: 'standard',
			currencyDisplay: 'narrowSymbol',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		});

		// Format the price based on the selected display currency
		const { value: price } = parseCurrencyString(autoDiscountApplied.price);
		final.price = formatter.format(price);

		// Format compared at price if it exists
		if (autoDiscountApplied.comparedAt) {
			const { value: comparedAt } = parseCurrencyString(autoDiscountApplied.comparedAt);
			final.comparedAt = formatter.format(comparedAt);
		} else {
			final.comparedAt = undefined;
		}

		// No conversion needed if currencies match
		if (marketCurrency === displayCurrency) return;

		// Get a conversion rate and apply to prices
		const rate = currencyRates[displayCurrency];

		// Apply conversion to price
		final.price = formatter.format(Math.round(price * rate));

		// Apply conversion to compare at price if it exists
		if (autoDiscountApplied.comparedAt) {
			const { value: comparedAt } = parseCurrencyString(autoDiscountApplied.comparedAt);
			final.comparedAt = formatter.format(Math.round(comparedAt * rate));
		} else {
			final.comparedAt = undefined;
		}
	});

	// Calculate discount percentage
//	$effect(() => {
//		// Exit early if we don't have both prices
//		if (!final.price || !final.comparedAt) {
//			discountPercentage = null;
//			return;
//		}
//
//		const { value: price } = parseCurrencyString(final.price);
//		const { value: comparedAt } = parseCurrencyString(final.comparedAt);
//
//		// Exit if either price couldn't be parsed properly
//		if (!price || !comparedAt) {
//			discountPercentage = null;
//			return;
//		}
//
//		// Calculate the discount amount (absolute difference)
//		const discountAmount = Math.abs(comparedAt - price);
//
//		// Calculate percentage based on the original price (comparedAt)
//		// This is the standard way to calculate discount percentages in retail
//		const percentage = Math.round((discountAmount / comparedAt) * 100);
//
//		// Only show a discount if there actually is one
//		discountPercentage = percentage > 0 ? percentage : null;
//	});

	const calculateAutomaticDiscount = async ({
		price: orgPrice
	}: PriceStrCouple): Promise<PriceStrCouple> => {
		if (!market) throw new Error('market is required');
		if (!variant_id) throw new Error('market is required');

		const { amount } = await nexusApi.getAutomaticDiscount(market, +variant_id);

		if (!amount || amount === 0)
			return {
				price: orgPrice,
				comparedAt: undefined
			};

		const { formatted: newPrice } = subtractCurrencyStrings(orgPrice, amount);

		return {
			price: newPrice,
			comparedAt: orgPrice
		};
	};

	return {
		get price() {
			return final.price;
		},
		get comparedAt() {
			return final.comparedAt;
		}
	};
};
