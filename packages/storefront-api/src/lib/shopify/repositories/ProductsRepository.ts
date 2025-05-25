import {
	getAvailableVariantsByProductByIdQuery,
	type GetAvailableVariantsByProductByIdResponse
} from '$lib/shopify/queries/GetAvailableVariantsByProductByIdQuery.js';
import { BaseRepository } from '$lib/shopify/repositories/BaseRepository.js';
import type { AvailableVariants } from '$lib/shopify/repositories/ProductsRepository.types.js';

export class ProductsRepository extends BaseRepository {
	async getAvailableVariantsByProductId(productGid: string): Promise<AvailableVariants[]> {
		const { data, errors } = await this.client.request<GetAvailableVariantsByProductByIdResponse>(
			getAvailableVariantsByProductByIdQuery,
			{
				variables: {
					id: productGid
				}
			}
		);

		if (errors) {
			console.error(errors);
			throw new Error('Failed to create cart');
		}

		if (!data) {
			throw new Error('Failed to get product');
		}

		return data.product.variants.edges.map((e) => e.node).filter((e) => e.availableForSale);
	}
}
