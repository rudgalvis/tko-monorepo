interface WindowShopify {
	currency: {
		active: string;
		rate: number;
		// other currency properties
	};
	routes: {
		root: string;
		// other route properties
	};
	locale: string;
	country: string;
	// Add other known properties as needed
}
