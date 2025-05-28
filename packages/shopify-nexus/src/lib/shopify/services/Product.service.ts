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
}
