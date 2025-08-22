export type PreOrderPrice = {
	checkout_price?: number;
	remaining_price?: number;
}

export type PreorderCartItem = {
	original_price: number;
	final_price: number;
	pre_oder_price?: PreOrderPrice
};

export const cartItemToPreorderCartItem = (item: any): PreorderCartItem => {
	const finalPrice = item.final_price;
	const quantity = item.quantity;
	const checkoutCharge = item?.selling_plan_allocation?.selling_plan?.checkout_charge as {value_type: 'percentage' | 'fixed_amount', value: 10};
	let checkoutChargeAmount = item?.selling_plan_allocation?.checkout_charge_amount;

	if(!checkoutChargeAmount && checkoutCharge) {
		switch (checkoutCharge.value_type) {
			case 'percentage':
				checkoutChargeAmount = item.selling_plan_allocation.price * (checkoutCharge.value / 100);
				break;
			case 'fixed_amount':
				checkoutChargeAmount = checkoutCharge.value;
				break;
		}
	}

	let isPartialPayment = true;
	let remainingBalanceChargeAmount = undefined;

	// Determine if Full or partial charge on partial payment setup
	if (!checkoutChargeAmount) isPartialPayment = false;
	if (checkoutChargeAmount && finalPrice <= checkoutChargeAmount) isPartialPayment = false;

	// charge amounts have no discounts applied, so actual checkout charge might be different
	// from the value that is hold in checkoutChargeAmount
	if (checkoutChargeAmount) {
		checkoutChargeAmount = Math.min(finalPrice, checkoutChargeAmount);
	}

	if (isPartialPayment) {
		remainingBalanceChargeAmount = finalPrice - checkoutChargeAmount;
	}

	const preOrderPrice: PreOrderPrice = {
		checkout_price: checkoutChargeAmount * quantity,
		remaining_price: (remainingBalanceChargeAmount || 0) * quantity
	}

	return {
		original_price: item.original_price * quantity,
		final_price: finalPrice * quantity,
		pre_oder_price: isPartialPayment ? preOrderPrice : undefined,
	};
};
