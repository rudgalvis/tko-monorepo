import { ProductsRepository } from '$lib/shopify/repositories/ProductsRepository'
import { DiscountType } from '$lib/shopify/types/enums/DiscountType'
import { ProductVariantInventoryPolicy } from '$lib/shopify/types/enums/ProductVariantInventoryPolicy'
import type { FinalVariantPrice } from '$lib/shopify/types/FinalVariantPrice'
import { generateVariantGid, gidToNumericId } from 'common-utils'
import { StorefrontApi, NexusApi } from 'storefront-api'

export class ProductService {
	constructor(public productRepository = new ProductsRepository(),
								public storefrontApi = new StorefrontApi(),
								public nexusApi = new NexusApi()) {}

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
	 * @param markets - Array of ISO 3166-1 alpha-2 country codes for market-specific pricing (e.g., ['US', 'DE', 'GB'])
	 */
	async getAllAvailableVariantsWithCompareAtPrice(
		pageSize = 250, 
		numberOfPages?: number, 
		startPage = 1,
		markets: string[] = []
	) {
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
		let tableData = activeVariants.map(v => ({
			url: v.adminUrl,
			productId: v.productId,
			variantId: v.variantId,
			price: v.price,
			compareAtPrice: v.compareAtPrice
		}))

		// If markets are provided, fetch market-specific pricing
		if (markets.length > 0) {
			tableData = await Promise.all(
				tableData.map(async (variant) => {
					const marketPricing: Record<string, string | null> = {}

					for (const market of markets) {
						try {
							const contextualPricing = await this.productRepository.getVariantContextualPricing(
								variant.variantId,
								market
							)
							
							if (contextualPricing) {
								// Store price as number (convert from string)
								marketPricing[`${market}_price`] = contextualPricing.price.amount
								// Store compareAtPrice as number or null
								marketPricing[`${market}_compareAtPrice`] = contextualPricing.compareAtPrice?.amount ?? null
							}
						} catch (error) {
							console.error(`Failed to get pricing for variant ${variant.variantId} in market ${market}:`, error)
							marketPricing[`${market}_price`] = '0'
							marketPricing[`${market}_compareAtPrice`] = null
						}
					}

					return {
						...variant,
						...marketPricing
					}
				})
			)
		}
		
		const endPage = startPage + pageCount - 1
		
		return {
			summary: {
				totalVariantsChecked: allVariants.length,
				activeVariantsCount: activeVariants.length,
				archivedDraftCount: allVariants.length - activeVariants.length,
				pageCount,
				startPage,
				endPage,
				pageRange: `${startPage}-${endPage}`,
				marketsRequested: markets
			},
			tableData,
			activeVariants // Full variant data if needed
		}
	}

	/**
	 * Gets all available variants with compareAtPrice and checks automatic discounts across multiple markets
	 * For each variant with compareAtPrice, fetches automatic discount amount for each country code provided
	 * Uses cached Nexus API for faster responses
	 * @param countryCodes - Array of country codes to check (e.g., ['US', 'GB', 'DE'])
	 * @param pageSize - Number of items per page (default: 250)
	 * @param numberOfPages - Number of pages to fetch. Undefined means fetch all pages (default: undefined)
	 * @param startPage - Page number to start from (1-indexed). Use to skip initial pages (default: 1)
	 * @returns Table data with additional columns for each market's automatic discount amount
	 * @throws Error if NexusApi is not configured for production (must use HTTPS)
	 */
	async getVariantsWithDiscountsByMarket(
		countryCodes: string[], 
		pageSize = 250, 
		numberOfPages?: number, 
		startPage = 1
	) {
		// Validate that NexusApi is configured for production (HTTPS only)
		// This function is intended for production use only with cached responses
		const nexusBaseUrl = this.nexusApi['BASE_URL'] || ''
		if (!nexusBaseUrl.startsWith('https://')) {
			throw new Error(
				`getVariantsWithDiscountsByMarket() is configured for production use only. ` +
				`NexusApi BASE_URL must use HTTPS. Current URL: ${nexusBaseUrl}`
			)
		}

		// Get all variants with compareAtPrice
		const variantsData = await this.getAllAvailableVariantsWithCompareAtPrice(
			pageSize, 
			numberOfPages, 
			startPage,
            countryCodes
		)
		
		// For each variant, check automatic discount for each country code
		const tableDataWithDiscounts = await Promise.all(
			variantsData.tableData.map(async (variant) => {
				const discountsByMarket: Record<string, number> = {}
				
				// Only check automatic discounts if variant has compareAtPrice
				if (variant.compareAtPrice) {
					for (const countryCode of countryCodes) {
						try {
							// Use NexusApi instead of Storefront API for automatic discount retrieval
							// NexusApi is cached in production, providing significantly faster responses
							// NOTE: Environment files must be configured for production (HTTPS)
							// This function is intended for internal system analysis with cached production API
							const discountResponse = await this.nexusApi.getVariantAutomaticDiscount(
								countryCode, 
								gidToNumericId(variant.variantId)
							)
							// Use _discount suffix to avoid overwriting contextual pricing data
							discountsByMarket[`${countryCode}_discount`] = discountResponse?.amount ?? 0
						} catch (error) {
							console.error(`Failed to get discount for variant ${variant.variantId} in ${countryCode}:`, error)
							discountsByMarket[`${countryCode}_discount`] = -1
						}
					}
				}
				
				return {
					...variant,
					...discountsByMarket
				}
			})
		)
		
		return {
			summary: {
				...variantsData.summary,
				marketsChecked: countryCodes
			},
			tableData: tableDataWithDiscounts,
			activeVariants: variantsData.activeVariants
		}
	}
}
