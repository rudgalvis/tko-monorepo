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
    getProductsTagsQuery,
    type GetProductTagsQueryVars,
    type GetProductTagsQueryVarsReturn,
} from '$lib/shopify/queries/getProductsTagsQuery'
import {
	getProductVariantInventoryDetailsQuery,
	type ProductVariantInventoryDetailsResponse,
} from '$lib/shopify/queries/getProductVariantInventoryDetailsQuery'
import {
	getVariantPriceByIdQuery,
	type GetVariantPriceByIdResponse,
} from '$lib/shopify/queries/getVariantPriceByIdQuery'
import {
	getVariantContextualPricingQuery,
	type GetVariantContextualPricingResponse,
	type GetVariantContextualPricingVars,
} from '$lib/shopify/queries/getVariantContextualPricingQuery'
import {
	getProductIdFromVariantQuery,
	type GetProductIdFromVariantResponse,
} from '$lib/shopify/queries/getProductIdFromVariantQuery'
import {
	productByHandleQuery,
	type ProductByHandleReturn,
	type ProductByHandleVars,
} from '$lib/shopify/queries/productByHandleQuery'
import {
	getAllAvailableProductsWithComparedAtPriceQuery,
	type GetAllAvailableProductsWithComparedAtPriceResponse,
	type GetAllAvailableProductsWithComparedAtPriceVars,
} from '$lib/shopify/queries/getAllAvailableProductsWithComparedAtPriceQuery'
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

    async getProductsTags(ids: string[]) {
        const { data, errors } = await this.client.request<GetProductTagsQueryVarsReturn>(getProductsTagsQuery, {
            variables: { ids } as GetProductTagsQueryVars,
        })

        if (errors) console.error(errors)

        if (!data) return null

        return data.nodes.filter(node => !!node).map((node) => node.tags)
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

	async getProductIdFromVariant(variantGid: string): Promise<string> {
		const { data, errors } = await this.client.request<GetProductIdFromVariantResponse>(
			getProductIdFromVariantQuery,
			{ variables: { id: variantGid } }
		)

		if (errors) {
			throw new Error(`Failed to get product ID from variant: ${errors}`)
		}

		if (!data?.node) {
			throw new Error(`Variant not found: ${variantGid}`)
		}

		return data.node.product.id
	}

	async disableSellOutOfStock({ variantGid }: { variantGid: string }) {
		const productId = await this.getProductIdFromVariant(variantGid)
		
		const r = await this.variantsBulkUpdate({
			productId,
			variants: [
				{
					id: variantGid,
					inventoryPolicy: ProductVariantInventoryPolicy.DENY,
				},
			],
		})

		if (!r) throw new Error('Failed to stop selling out of stock')

		return true
	}

	async enableSellOutOfStock({ variantGid }: { variantGid: string }) {
		const productId = await this.getProductIdFromVariant(variantGid)
		
		const r = await this.variantsBulkUpdate({
			productId,
			variants: [
				{
					id: variantGid,
					inventoryPolicy: ProductVariantInventoryPolicy.CONTINUE,
				},
			],
		})

		if (!r) throw new Error('Failed to enable selling out of stock')

		return true
	}

	/**
	 * Applies automatic discounts
	 * */
	async getFinalVariantPrice() {

	}

	/**
	 * Gets all available product variants with their compared_at price
	 * Useful for identifying pricing problems and discount issues
	 */
	async getAllAvailableVariantsWithComparedAtPrice(variables: GetAllAvailableProductsWithComparedAtPriceVars = { first: 50 }) {
		const { data, errors } = await this.client.request<GetAllAvailableProductsWithComparedAtPriceResponse>(
			getAllAvailableProductsWithComparedAtPriceQuery,
			{
				variables,
			}
		)

		if (errors) console.error(errors)

		if (!data) return null

		// Flatten the response to return all variants with their compareAtPrice
		const allVariants = data.products.edges.flatMap(product => 
			product.node.variants.edges
				.filter(variant => variant.node.availableForSale)
				.map(variant => ({
					variantId: variant.node.id,
					availableForSale: variant.node.availableForSale,
					price: variant.node.price,
					compareAtPrice: variant.node.compareAtPrice,
					product: {
						id: product.node.id,
						status: product.node.status,
					}
				}))
		)

		return {
			variants: allVariants,
			pageInfo: data.products.pageInfo,
			totalCount: allVariants.length
		}
	}

	/**
	 * Gets all variant IDs that are available for sale and have a compareAtPrice set
	 * Returns variant ID, product ID, and product status (ACTIVE/DRAFT/ARCHIVED)
	 * Useful for identifying variants with discounts
	 */
	async getAllAvailableProductsWithComparedAtPrice(variables: GetAllAvailableProductsWithComparedAtPriceVars = { first: 250 }) {
		const { data, errors } = await this.client.request<GetAllAvailableProductsWithComparedAtPriceResponse>(
			getAllAvailableProductsWithComparedAtPriceQuery,
			{
				variables,
			}
		)

		if (errors) console.error(errors)

		if (!data) return null

		// Flatten and filter to get variant info with product status
		const variants = data.products.edges.flatMap(product => 
			product.node.variants.edges
				.filter(variant => 
					variant.node.availableForSale && 
					variant.node.compareAtPrice !== null &&
					variant.node.compareAtPrice !== '0' &&
					variant.node.compareAtPrice !== '0.0' &&
					variant.node.compareAtPrice !== '0.00'
				)
				.map(variant => {
					// Extract numeric IDs from GID format
					const productNumericId = product.node.id.split('/').pop()
					const variantNumericId = variant.node.id.split('/').pop()
					const adminUrl = `https://admin.shopify.com/store/the-knotty-ones/products/${productNumericId}/variants/${variantNumericId}`
					
					return {
						variantId: variant.node.id,
						productId: product.node.id,
						productStatus: product.node.status,
						isProductActive: product.node.status === 'ACTIVE',
						price: variant.node.price,
						compareAtPrice: variant.node.compareAtPrice,
						adminUrl
					}
				})
		)

		return {
			variants,
			pageInfo: data.products.pageInfo,
			totalCount: variants.length
		}
	}

	/**
	 * Gets contextual pricing (price and compareAtPrice) for a specific variant in a given country/market
	 * @param variantId - The variant GID
	 * @param country - ISO 3166-1 alpha-2 country code (e.g., 'US', 'DE', 'GB')
	 */
	async getVariantContextualPricing(variantId: string, country: string) {
		const { data, errors } = await this.client.request<GetVariantContextualPricingResponse>(
			getVariantContextualPricingQuery,
			{
				variables: {
					id: variantId,
					country: country.toUpperCase()
				} as GetVariantContextualPricingVars
			}
		)

		if (errors) console.error(errors)

		if (!data) return null

		return data.productVariant.contextualPricing
	}
}
