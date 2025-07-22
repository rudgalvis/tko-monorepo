const dump = (...args: unknown[]) => console.log('dump', ...args);
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Current cart implementation has problems when displaying selling plan prices
// totals and things like that. That's a nasty fix for this working with CartJS
export const enforceCartCalculationConsistency = async () => {
	await wait(1000)

	// Regular cart updates break the calculations of the cart
	// We want to trigger cart update when this happens
	const handleCartFetch = () => {
		dump('regular cart update');

		const {CartJS} = window;

		if (!CartJS) return;

		if (CartJS.cart.items.length === 0) return;

		CartJS.updateItem(1, CartJS.cart.items[0].quantity) // Weirdly updateItem index starts from 1, instead of 0
	};

	// When a cart update is performed, then the calculations are correct
	const handleCartUpdate = () => {
		dump('cart update, and dispatching cart:fix-1-applied');
		document.dispatchEvent(new Event('cart:fix-1-applied'));
	};

	let isUpdate = false;

	document.addEventListener('cart:before-update-item', () => {
		isUpdate = true;
	});

	let debouncer: NodeJS.Timeout;
	document.addEventListener('cart:request-complete', () => {
		clearTimeout(debouncer);

		debouncer = setTimeout(() => {
			if (isUpdate) {
				isUpdate = false;
				handleCartUpdate();
				return;
			}

			handleCartFetch();
		}, 100);
	});
};
