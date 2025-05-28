import {
	type InventoryAdjustQuantitiesInput,
	inventoryAdjustQuantitiesMutation,
	type InventoryAdjustQuantitiesReturn,
} from '$lib/shopify/mutations/inventoryAdjustQuantitiesMutation'
import {
	type ProductCreateInput,
	productCreateMutation,
	type ProductCreateResult,
} from '$lib/shopify/mutations/productCreateMutation'
import {
	productDeleteMutation,
	type ProductDeleteReturn,
} from '$lib/shopify/mutations/productDeleteMutation'
import {
	productOptionUpdateMutation,
	type ProductOptionUpdateReturn,
	type ProductOptionUpdateVars,
} from '$lib/shopify/mutations/productOptionUpdateMutation'
import {
	type ProductVariantsBulkCreateInput,
	productVariantsBulkCreateMutation,
	type ProductVariantsBulkCreateReturn,
} from '$lib/shopify/mutations/productVariantsBulkCreateMutation'
import {
	productVariantsBulkUpdate,
	type ProductVariantsBulkUpdateInput,
	type ProductVariantsBulkUpdateReturn,
} from '$lib/shopify/mutations/productVariantsBulkUpdateMutation'
import {
	getProductVariantInventoryDetailsQuery,
	type ProductVariantInventoryDetailsResponse,
} from '$lib/shopify/queries/getProductVariantInventoryDetailsQuery'
import {
	getVariantPriceByIdQuery,
	type GetVariantPriceByIdResponse,
} from '$lib/shopify/queries/getVariantPriceByIdQuery'
import {
	productByHandleQuery,
	type ProductByHandleReturn,
	type ProductByHandleVars,
} from '$lib/shopify/queries/productByHandleQuery'
import { BaseRepository } from '$lib/shopify/repositories/BaseRepository'
import { ProductVariantInventoryPolicy } from '$lib/shopify/types/enums/ProductVariantInventoryPolicy'
import type { VariantPrice } from 'storefront-api'

export class ProductsRepository extends BaseRepository {
	async createProduct(variables: ProductCreateInput) {
		const { data, errors } = await this.client.request<ProductCreateResult>(productCreateMutation, {
			variables,
		})

		if (errors) console.error(errors)

		if (!data) return null

		return data.productCreate.product
	}

	async getProductByHandle(variables: ProductByHandleVars) {
		const { data, errors } = await this.client.request<ProductByHandleReturn>(
			productByHandleQuery,
			{
				variables,
			}
		)

		if (errors) console.error(errors)

		if (!data) return null

		return data.productByHandle
	}

	async optionUpdateMutation(variables: ProductOptionUpdateVars) {
		const { data, errors } = await this.client.request<ProductOptionUpdateReturn>(
			productOptionUpdateMutation,
			{
				variables,
			}
		)

		if (errors) console.error(errors)

		if (!data) return null

		return data.productOptionUpdate
	}

	async variantsBulkCreate(variables: ProductVariantsBulkCreateInput) {
		const { data, errors } = await this.client.request<ProductVariantsBulkCreateReturn>(
			productVariantsBulkCreateMutation,
			{
				variables,
			}
		)

		if (errors) console.error(errors)

		if (!data) return null

		return data.productVariantsBulkCreate.productVariants
	}

	async variantsBulkUpdate(variables: ProductVariantsBulkUpdateInput) {
		const { data, errors } = await this.client.request<ProductVariantsBulkUpdateReturn>(
			productVariantsBulkUpdate,
			{
				variables,
			}
		)

		if (errors) console.error(errors)

		if (!data) return null

		return data.productVariantsBulkUpdate
	}

	async inventoryAdjustQuantities(input: InventoryAdjustQuantitiesInput) {
		const { data, errors } = await this.client.request<InventoryAdjustQuantitiesReturn>(
			inventoryAdjustQuantitiesMutation,
			{
				variables: input,
			}
		)

		if (errors) console.error(errors)

		if (!data) return null

		return data.inventoryAdjustQuantities
	}

	async getVariantInventories(ids: string[]) {
		const { data, errors } = await this.client.request<ProductVariantInventoryDetailsResponse>(
			getProductVariantInventoryDetailsQuery,
			{
				variables: {
					ids,
				},
			}
		)

		if (errors) console.error(errors)

		if (!data) return null

		return data.nodes
	}

	async deleteProduct(id: string) {
		const { data, errors } = await this.client.request<ProductDeleteReturn>(productDeleteMutation, {
			variables: { id },
		})

		if (errors) console.error(errors)

		if (!data) return null

		const { userErrors } = data.productDelete

		if(userErrors) {
			userErrors.forEach((error) => {
				throw new Error(`when deleting ${id}. ${error.message}`)
			})
		}

		return data.productDelete
	}

	async getVariantPrice(countryCode: string, variantGid: string): Promise<VariantPrice> {
		const { data, errors } = await this.client.request<GetVariantPriceByIdResponse>(
			getVariantPriceByIdQuery,
			{
				variables: {
					id: variantGid,
					country: countryCode.toUpperCase()
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
				...data.node.contextualPricing.price,
				amount: +data.node.contextualPricing.price.amount
			},
			compareAtPrice: data.node.contextualPricing.compareAtPrice
				? {
					...data.node.contextualPricing.compareAtPrice,
					amount: +data.node.contextualPricing.compareAtPrice.amount
				}
				: null
		};
	}

	async disableSellOutOfStock({ productId, variantId }: { productId: string; variantId: string }) {
		const r = await this.variantsBulkUpdate({
			productId,
			variants: [
				{
					id: variantId,
					inventoryPolicy: ProductVariantInventoryPolicy.DENY,
				},
			],
		})

		if (!r) throw new Error('Failed to stop selling out of stock')

		return true
	}

	/**
	 * Applies automatic discounts
	 * */
	async getFinalVariantPrice() {

	}
}
