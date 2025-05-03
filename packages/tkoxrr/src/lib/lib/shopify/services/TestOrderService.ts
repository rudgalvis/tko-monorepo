import { LocationsRepository } from '$lib/shopify/repositories/LocationsRepository';
import { OrderRepository } from '$lib/shopify/repositories/OrderRepository';
import { ProductsRepository } from '$lib/shopify/repositories/ProductsRepository';

export class TestOrderService {
	constructor(
		public orderRepository = new OrderRepository(),
		public productRepository = new ProductsRepository(),
		public locationsRepository = new LocationsRepository()
	) {}

	async createOrder(lineItems: { quantity: number; variantId: string }[], productId: string) {
		const currencyCode = await this.orderRepository.getCurrencyCode();
		const locations = await this.locationsRepository.getLocations();

		if (!locations || !locations[1]) throw new Error('Locations not found');

		if (!currencyCode) throw new Error('Currency code not found');

		const order = await this.orderRepository.createOrder({
			options: {
				inventoryBehaviour: 'DECREMENT_OBEYING_POLICY'
			},
			order: {
				lineItems,
				currency: currencyCode,
				customer: {
					toUpsert: {
						email: 'rokasr788@gmail.com',
						firstName: 'Rokas'
					}
				},
				transactions: [
					{
						gateway: 'manual',
						kind: 'SALE',
						status: 'SUCCESS',
						locationId: locations[1].id,
						amountSet: {
							shopMoney: {
								amount: 100,
								currencyCode: currencyCode
							}
						}
					}
				]
			}
		});

		if (!order) return false;

		return order;
	}
}
