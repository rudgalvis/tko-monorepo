import {
	getAvailableVariantsByProductByIdQuery,
	type GetAvailableVariantsByProductByIdResponse
} from '$lib/shopify/queries/GetAvailableVariantsByProductByIdQuery.js';
import { getProduct, type GetProduct } from '$lib/shopify/queries/GetProduct.js';
import {
	getVariantPriceByIdQuery,
	type GetVariantPriceByIdResponse
} from '$lib/shopify/queries/GetVariantPriceByIdQuery.js';
import { BaseRepository } from '$lib/shopify/repositories/BaseRepository.js';
import type {
	VariantAvailability,
	VariantPrice
} from '$lib/shopify/repositories/ProductsRepository.types.js';

export class ProductsRepository extends BaseRepository {
	async getAvailableVariantsByProductId(productGid: string): Promise<VariantAvailability[]> {
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
			throw new Error('Failed to get available variants by product id');
		}

		if (!data) {
			throw new Error('Failed to get available variants by product id');
		}

		return data.product.variants.edges.map((e) => e.node).filter((e) => e.availableForSale);
	}

	async getVariantPrice(variantGid: string): Promise<VariantPrice> {
		const { data, errors } = await this.client.request<GetVariantPriceByIdResponse>(
			getVariantPriceByIdQuery,
			{
				variables: {
					id: variantGid
				}
			}
		);

		if (errors) {
			console.error(errors);
		}

		if (!data)
			throw new Error(`Failed to get variant price by variant id: ${variantGid}`);

		if (!data.node)
			throw new Error(`Variant not found: ${variantGid}`);

		return {
			...data.node,
			price: {
				...data.node.price,
				amount: +data.node.price.amount
			},
			compareAtPrice: data.node.compareAtPrice
				? {
						...data.node.compareAtPrice,
						amount: +data.node.compareAtPrice.amount
					}
				: null
		};
	}

	async getProduct(productGid: string) {
		const { data, errors } = await this.client.request<GetProduct>(
			getProduct,
			{
				variables: {
					id: productGid
				}
			}
		);

		if (errors) {
			console.error(errors);
		}

		if (!data)
			throw new Error(`Failed to get product price by product id: ${productGid}`);

		if (!data.product)
			throw new Error(`Product not found: ${productGid}`);

		return data.product
	}
}
