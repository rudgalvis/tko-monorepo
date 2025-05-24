import type { PriceStrCouple } from '$lib/types/PriceStrCouple.js';
import { parseCurrencyString } from '$lib/utils/formatters/price-formatter.js';

export const calculateDiscountPercentage = ({price: inputPrice, comparedAt: inputComparedAt}: PriceStrCouple) => {
	// Exit early if we don't have both prices
	if (!inputPrice || !inputComparedAt) {
		return null
	}

	const { value: price } = parseCurrencyString(inputPrice);
	const { value: comparedAt } = parseCurrencyString(inputComparedAt);

	// Exit if either price couldn't be parsed properly
	if (!price || !comparedAt) {
		return null;
	}

	// Calculate the discount amount (absolute difference)
	const discountAmount = Math.abs(comparedAt - price);

	// Calculate percentage based on the original price (comparedAt)
	// This is the standard way to calculate discount percentages in retail
	const percentage = Math.round((discountAmount / comparedAt) * 100);

	// Only show a discount if there actually is one
	return percentage > 0 ? percentage : null;
}