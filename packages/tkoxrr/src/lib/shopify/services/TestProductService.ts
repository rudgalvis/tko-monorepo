import { LocationsRepository } from '$lib/shopify/repositories/LocationsRepository'
import { ProductsRepository } from '$lib/shopify/repositories/ProductsRepository'
import { ProductVariantInventoryPolicy } from '$lib/shopify/types/ProductVariantInventoryPolicy'

export class TestProductService {
	// Use this as configured starting point
	public readonly TEST_PRODUCT_VARIANT_DETAILS = [
		{
			title: 'In stock, not selling out of stock',
			quantity: 5,
			policy: ProductVariantInventoryPolicy.DENY,
		},
		{
			title: 'In stock, selling out of stock',
			quantity: 5,
			policy: ProductVariantInventoryPolicy.CONTINUE,
			maximumPreSale: 5,
			expectedDate: '2024 04 04',
		},
		{
			title: 'Out of stock, selling out of stock',
			quantity: -2,
			policy: ProductVariantInventoryPolicy.CONTINUE,
			maximumPreSale: 5,
			expectedDate: '2024 04 04',
		},
		{
			title: 'Out of stock, not selling out of stock',
			quantity: -2,
			policy: ProductVariantInventoryPolicy.CONTINUE,
			maximumPreSale: 5,
		},
	]
	private readonly TEST_PRODUCT_TITLE = 'Delčia: Lemon Cotton Sweater'

	private productsRepository: ProductsRepository
	private locationsRepository: LocationsRepository
	private testProductId: string = ''

	constructor() {
		this.productsRepository = new ProductsRepository()
		this.locationsRepository = new LocationsRepository()
	}

	convertTitleToHandle(title: string): string {
		if (!title) return ''

		// First, normalize the string to decompose diacritical marks
		// Then replace special characters with their ASCII equivalents
		let handle = title.normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks

		// Convert to lowercase
		handle = handle.toLowerCase()

		// Replace non-alphanumeric characters (except letters that survived normalization) with spaces
		handle = handle.replace(/[^\w\s-]/g, ' ')

		// Normalize whitespace
		handle = handle.trim().replace(/\s+/g, ' ')

		// Replace spaces with hyphens
		handle = handle.replace(/\s/g, '-')

		// Remove any remaining invalid characters
		handle = handle.replace(/[^a-z0-9-]/g, '')

		// Replace multiple hyphens with a single hyphen
		handle = handle.replace(/-+/g, '-')

		// Remove leading and trailing hyphens
		handle = handle.replace(/^-+|-+$/g, '')

		return handle
	}

	async findProduct() {
		const testProduct = await this.productsRepository.getProductByHandle({
			handle: this.convertTitleToHandle(this.TEST_PRODUCT_TITLE),
		})

		if (!testProduct) return

		this.testProductId = testProduct.id

		return testProduct
	}

	async deleteProduct() {
		if (!this.testProductId) {
			if (!(await this.findProduct())?.id) throw new Error('Test product to delete was not found')
		}

		const deleteProduct = await this.productsRepository.deleteProduct(this.testProductId)

		if (!deleteProduct) return false

		return true
	}
	async createProduct() {
		if (await this.findProduct()) {
			await this.deleteProduct()
		}

		const product = await this.productsRepository.createProduct({
			input: {
				title: this.TEST_PRODUCT_TITLE,
				productOptions: [{ name: 'Option name', values: [{ name: '-' }] }], // Only single value is being saved
			},
		})

		if (!product || !product.id) throw new Error('Product id was not found')

		const locations = await this.locationsRepository.getLocations() // Required for quantities

		if (!locations) throw new Error('Locations were not found')

		const variants = await this.productsRepository.variantsBulkCreate({
			productId: product.id,
			variants: this.TEST_PRODUCT_VARIANT_DETAILS.map((e, i) => {
				const expectedDateMetafield = e.expectedDate
					? {
							namespace: 'custom',
							key: 'estimated_pre_order_shipping_date',
							value: new Date(e.expectedDate).toISOString(),
						}
					: {}

				const maximumPreSaleMetafield = e.maximumPreSale
					? {
							namespace: 'custom',
							key: 'pre_order_limit',
							value: e.maximumPreSale.toString(),
						}
					: {}

				return {
					inventoryItem: {
						sku: i.toString(),
						tracked: true,
						requiresShipping: true,
					},
					price: '15.99',
					compareAtPrice: '19.99',
					inventoryPolicy: e.policy,
					inventoryQuantities: {
						availableQuantity: e.quantity,
						locationId: locations[1].id,
					},
					metafields: [maximumPreSaleMetafield, expectedDateMetafield],
					optionValues: [
						{
							name: e.title,
							optionId: product.options[0].id,
						},
					],
				}
			}),
		})

		if (!variants) throw new Error('Variants were not created')

		return {
			product: {
				id: product.id,
				title: product.title,
			},
			variants: variants.map(({ id, title }) => ({ id, title })),
		}
	}
}
