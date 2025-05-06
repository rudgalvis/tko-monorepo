export interface Cart {
	id: string;
	totalQuantity: number;
	cost: Cost;
	lines: Lines;
	checkoutUrl: string;
}

export interface Cost {
	totalAmount: TotalAmount;
	subtotalAmount: SubtotalAmount;
}

export interface TotalAmount {
	amount: string;
	currencyCode: string;
}

export interface SubtotalAmount {
	amount: string;
	currencyCode: string;
}

export interface Lines {
	nodes: Node[];
}

export interface Node {
	id: string;
	quantity: number;
	merchandise: Merchandise;
	sellingPlanAllocation: {
		sellingPlan: {
			id: string;
		};
	} | null;
}

export interface Merchandise {
	id: string;
	title: string;
	price: Price;
	image: Image;
	product: Product;
}

export interface Price {
	amount: string;
	currencyCode: string;
}

export interface Image {
	url: string;
}

export interface Product {
	title: string;
	id?: string;
}

export type CartLineUpdateInput = {
	lineGid: string;
	sellingPlanGid: string;
	quantity: number;
};

export type CartLineAddInput = {
	variantGid: string;
	quantity: number;
};
