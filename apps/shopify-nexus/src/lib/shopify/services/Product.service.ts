import { ProductsRepository } from '$lib/shopify/repositories/ProductsRepository'
import { DiscountType } from '$lib/shopify/types/enums/DiscountType'
import { ProductVariantInventoryPolicy } from '$lib/shopify/types/enums/ProductVariantInventoryPolicy'
import type { FinalVariantPrice } from '$lib/shopify/types/FinalVariantPrice'
import { generateVariantGid } from 'common-utils'
import { StorefrontApi } from 'storefront-api'

export class ProductService {
	constructor(public productRepository = new ProductsRepository(),
							public storefrontApi = new StorefrontApi()) {}

	async disableSellOutOfStock({ productId, variantId }: { productId: string; variantId: string }) {
		const r = await this.productRepository.variantsBulkUpdate({
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

	async getFinalVariantPrice(countryCode: string, variantId: number): Promise<FinalVariantPrice> {
		const {
						price: { amount: price },
						compareAtPrice,
						availableForSale
					} = await this.productRepository.getVariantPrice(countryCode, generateVariantGid(variantId));

		const discount = await this.storefrontApi.getAutomaticDiscountForVariant(countryCode, variantId)

		if(!availableForSale) throw Error('Variant is not available for sale');

		// Automatic discount was not applied, we can return the price as is
		if (discount === 0 && compareAtPrice) {
			const { amount: comparedAt } = compareAtPrice;

			return {
				price,
				comparedAt,
				discountType: DiscountType.NATIVE
			};
		}

		// Automatic discount was applied, disregard comparedAt
		if (discount > 0) {
			return {
				price: price - discount,
				comparedAt: price,
				discountType: DiscountType.AUTOMATIC
			};
		}

		// No discount exists
		return {
			price,
			comparedAt: null,
			discountType: DiscountType.NONE
		};
	}

	/**
	 * Gets all available product variants with compareAtPrice
	 * Handles pagination automatically and returns structured data
	 * @param pageSize - Number of items per page (default: 250)
	 * @param numberOfPages - Number of pages to fetch. Undefined means fetch all pages (default: undefined)
	 * @param startPage - Page number to start from (1-indexed). Use to skip initial pages (default: 1)
	 */
	async getAllAvailableVariantsWithCompareAtPrice(pageSize = 250, numberOfPages?: number, startPage = 1) {
		let result = await this.productRepository.getAllAvailableProductsWithComparedAtPrice({ first: pageSize })
		
		if (!result) {
			throw new Error('Failed to fetch products with compared at price')
		}

		let currentPage = 1
		
		// Skip pages until we reach startPage
		while (currentPage < startPage && result.pageInfo.hasNextPage) {
			const nextResult = await this.productRepository.getAllAvailableProductsWithComparedAtPrice({ 
				first: pageSize, 
				after: result.pageInfo.endCursor || undefined 
			})
			
			if (!nextResult) {
				break
			}
			
			result = nextResult
			currentPage++
		}

		// Start collecting data from startPage
		const allVariants = [...result.variants]
		let pageCount = 1

		// Fetch remaining pages or up to numberOfPages
		while (result.pageInfo.hasNextPage) {
			// Check if we've reached the page limit
			if (numberOfPages !== undefined && pageCount >= numberOfPages) {
				break
			}

			pageCount++
			const nextResult = await this.productRepository.getAllAvailableProductsWithComparedAtPrice({ 
				first: pageSize, 
				after: result.pageInfo.endCursor || undefined 
			})
			
			if (!nextResult) {
				break
			}
			
			result = nextResult
			allVariants.push(...result.variants)
		}
		
		// Filter for active products only
		const activeVariants = allVariants.filter(v => v.isProductActive)
		
		// Prepare table data
		const tableData = activeVariants.map(v => ({
			url: v.adminUrl,
			price: v.price,
			compareAtPrice: v.compareAtPrice
		}))
		
		const endPage = startPage + pageCount - 1
		
		return {
			summary: {
				totalVariantsChecked: allVariants.length,
				activeVariantsCount: activeVariants.length,
				archivedDraftCount: allVariants.length - activeVariants.length,
				pageCount,
				startPage,
				endPage,
				pageRange: `${startPage}-${endPage}`
			},
			tableData,
			activeVariants // Full variant data if needed
		}
	}
}
