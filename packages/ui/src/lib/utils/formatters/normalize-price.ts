import type { PriceWithSymbol } from '$lib/types/PriceWithSymbol.js';
import { parseCurrencyString } from '$lib/utils/formatters/price-formatter.js';

export const normalizePrice = (price: string, comparedAt: string | undefined): PriceWithSymbol => {
	// Step 1: Normalize 'nodiscount' value coming from legacy code
	if (comparedAt === 'nodiscount' || !comparedAt) {
		comparedAt = undefined;
	}

	// Step 2: Fix faulty input by removing compared_at when equal
	if (comparedAt && parseCurrencyString(price).value === parseCurrencyString(comparedAt).value) {
		comparedAt = undefined;
	}

	// Step 3: Fix faulty input by swapping values
	// (when the price is higher than compared_at)
	if (comparedAt && parseCurrencyString(price).value > parseCurrencyString(comparedAt).value) {
		[price, comparedAt] = [comparedAt, price];
	}

	// Return the computed values
	return { price, comparedAt };
};
