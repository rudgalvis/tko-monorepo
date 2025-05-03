import {
	type OrderAddNoteInput,
	orderAddNoteMutation,
	type OrderAddNoteResponse
} from '$lib/shopify/mutations/orderAddNoteMutation';
import { orderCreateMutation, type OrderInput } from '$lib/shopify/mutations/orderCreateMutation';
import {
	type OrderByIdInput,
	type OrderByIdResponse,
	orderNoteQuery
} from '$lib/shopify/queries/orderNoteQuery';
import { BaseRepository } from '$lib/shopify/repositories/BaseRepository';
import { gidGenerator, ObjectsGIDS } from '$lib/utils/generators/gid-generator';

export class OrderRepository extends BaseRepository {
	async createOrder(variables: OrderInput) {
		const { data, errors } = await this.client.request(orderCreateMutation, {
			variables
		});

		if (errors) console.error(errors);

		if (!data) return null;

		if (data.orderCreate.userErrors.length > 0) {
			console.error(data.orderCreate.userErrors);
			throw new Error('Error creating order');
		}

		return data.orderCreate;
	}

	async readNote(orderId: number) {
		const { data, errors } = await this.client.request<OrderByIdResponse>(orderNoteQuery, {
			variables: {
				id: gidGenerator(ObjectsGIDS.ORDER, orderId)
			} as OrderByIdInput
		});

		if (errors) console.error(errors);

		if (!data) return null;

		return data.order.note;
	}

	async updateNote(orderId: number, comment: string) {
		const { data, errors } = await this.client.request<OrderAddNoteResponse>(orderAddNoteMutation, {
			variables: {
				input: {
					id: gidGenerator(ObjectsGIDS.ORDER, orderId),
					note: comment
				} as OrderAddNoteInput
			}
		});

		if (errors) console.error(errors);

		if (!data) return null;

		return data.orderUpdate.order.note;
	}
}
