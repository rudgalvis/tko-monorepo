export type FormattedPrice = {
	price: string;
	compared_at: string | undefined;
};

export function parseCurrencyString(priceString: string, newValue: number | undefined = undefined) {
	if (!priceString && priceString !== '') {
		return {
			formatted: '',
			value: 0,
			symbol: '',
			isSymbolAtStart: true
		};
	}

	priceString = String(priceString);

	const currencyMatch = priceString.match(/^[\p{Currency_Symbol}\s]+|[\p{Currency_Symbol}\s]+$/gu);
	const symbol = currencyMatch ? currencyMatch[0] : '';
	const isSymbolAtStart = priceString.startsWith(symbol);

	if (!newValue) {
		let numStr = priceString.replace(/[^\d.,\-]/g, '');

		if (numStr.includes(',')) {
			if (/,\d{2}$/.test(numStr)) {
				numStr = numStr.replace(/\./g, '').replace(',', '.');
			} else {
				numStr = numStr.replace(/,/g, '');
			}
		}

		newValue = parseFloat(numStr);
		if (isNaN(newValue)) newValue = 0;

		return {
			formatted: priceString || '0',
			value: newValue,
			symbol,
			isSymbolAtStart
		};
	}

	newValue = Number(newValue);
	if (isNaN(newValue)) newValue = 0;

	// Format number removing trailing zeros
	let formattedNumber = newValue.toString();
	// Add decimal part if it's a whole number but original had decimals
	const originalHasDecimals = /[.,]\d{2}(?:\s*[^\d.,\-\s]+)?$/.test(priceString);
	if (!formattedNumber.includes('.') && originalHasDecimals) {
		formattedNumber += '.00';
	} else if (formattedNumber.includes('.')) {
		// Ensure 2 decimal places for cents
		const [whole, decimal] = formattedNumber.split('.');
		formattedNumber = whole + '.' + (decimal + '00').slice(0, 2);
	}

	const usesCommaDecimal = /\d,\d{2}(?:\s*[^\d.,\-\s]+)?$/.test(priceString);
	if (usesCommaDecimal) {
		formattedNumber = formattedNumber.replace('.', ',');
	}

	const hasThousandSeparators = /\d{1,3}([,.])\d{3}/.test(priceString);
	if (hasThousandSeparators) {
		const [whole, decimal] = formattedNumber.split(/[.,]/);
		const separator = usesCommaDecimal ? '.' : ',';
		const withSeparators = whole.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
		formattedNumber = `${withSeparators}${decimal ? (usesCommaDecimal ? ',' : '.') + decimal : ''}`;
	}

	const hasSpaceAfterSymbol = /^[\p{Currency_Symbol}]+\s/u.test(priceString);
	const hasSpaceBeforeSymbol = /\s[\p{Currency_Symbol}]+$/u.test(priceString);

	const formatted = isSymbolAtStart
		? `${symbol}${hasSpaceAfterSymbol ? ' ' : ''}${formattedNumber}`
		: `${formattedNumber}${hasSpaceBeforeSymbol ? ' ' : ''}${symbol}`;

	return {
		formatted,
		value: newValue,
		symbol,
		isSymbolAtStart
	};
}

export const subtractCurrencyStrings = (a: string, b: string) => {
	const { value: aVal } = parseCurrencyString(a);
	const { value: bVal } = parseCurrencyString(b);

	return parseCurrencyString(a, aVal - bVal);
};

export const calculateDiscountPercentage = (a: string, b: string | undefined) => {
	if (!b) return undefined;

	const { value: aVal } = parseCurrencyString(a);
	const { value: bVal } = parseCurrencyString(b);

	const discount = Math.abs(aVal - bVal);

	return ((discount / bVal) * 100).toFixed(0);
};

export const priceFormatter = (price: string, compared_at: string | undefined): FormattedPrice => {
	let result: {
		price: string;
		compared_at: string | undefined;
	} = {
		price: '',
		compared_at: undefined
	};

	let { value: a } = parseCurrencyString(price);
	let { value: b } = compared_at ? parseCurrencyString(compared_at) : { value: undefined };

	if (a && b) {
		if (isNaN(b)) {
			result.compared_at = undefined;
		} else if (a > b) {
			result.compared_at = price;
			result.price = compared_at as string;
		} else {
			result.price = price;
			result.compared_at = compared_at as string;
		}
	} else if (a) {
		result.price = price;
		result.compared_at = undefined;
	}

	return result;
};
