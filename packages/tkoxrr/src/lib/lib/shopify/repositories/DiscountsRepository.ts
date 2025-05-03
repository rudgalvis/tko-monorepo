import { draftOrderMutation } from '$lib/shopify/mutations/draftOrderMutation';
import { automaticDiscountAppNodesQuery } from '$lib/shopify/queries/codeDiscountNodesQuery';
import {
	automaticDiscountNodesQuery,
	type AutomaticDiscountNodesQueryReturn
} from '$lib/shopify/queries/automaticDiscountNodesQuery';
import { BaseRepository } from '$lib/shopify/repositories/BaseRepository';

export class DiscountsRepository extends BaseRepository {
	async getAvailableDiscounts() {
		const { data, errors } = await this.client.request<AutomaticDiscountNodesQueryReturn>(
			automaticDiscountNodesQuery
		);

		if (errors) console.error(errors);

		if (!data) return null;

		return data.discountNodes.edges.map((edge) => edge.node);

		//		return data.automaticDiscountNodes.edges.map((edge) => edge.node);
	}

	async createDraftOrder(variantId: string) {
		const { data, errors } = await this.client.request(draftOrderMutation, {
			variables: { variantId }
		});

		return data;
	}
}
