import { LocationsRepository } from '$lib/shopify/repositories/LocationsRepository'
import { OrderRepository } from '$lib/shopify/repositories/OrderRepository'

export class TestOrderService {
	constructor(
		public orderRepository = new OrderRepository(),
		public locationsRepository = new LocationsRepository()
	) {}

	async createOrder(
		lineItems: {
			quantity: number
			variantId: string
			productId: string
			requiresShipping: boolean
		}[]
	) {
		const currencyCode = await this.orderRepository.getCurrencyCode()
		const [location] = (await this.locationsRepository.getLocations()) || []

		if (!location) throw new Error('Locations not found')

		if (!currencyCode) throw new Error('Currency code not found')

		const order = await this.orderRepository.createOrder({
			options: {
				inventoryBehaviour: 'DECREMENT_OBEYING_POLICY',
			},
			order: {
				lineItems,
				currency: currencyCode,
				customer: {
					toUpsert: {
						email: 'rokasr788@gmail.com',
						firstName: 'Rokas',
					},
				},
				transactions: [
					{
						gateway: 'manual',
						kind: 'SALE',
						status: 'SUCCESS',
						locationId: location.id,
						amountSet: {
							shopMoney: {
								amount: 100,
								currencyCode: currencyCode,
							},
						},
					},
				],
			},
		})

		if (!order) return false

		return order
	}
}
