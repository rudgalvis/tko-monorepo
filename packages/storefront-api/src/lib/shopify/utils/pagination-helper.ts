import type { GetAllAvailableVariantsResponse, GetAllAvailableVariantsVars } from '$lib/shopify/queries/GetAllAvailableVariantsQuery.js';

export interface PaginatedResult<T> {
	data: T[];
	hasNextPage: boolean;
	hasPreviousPage: boolean;
	totalFetched: number;
}

export class PaginationHelper {
	/**
	 * Fetches all products with pagination support
	 * @param fetchFunction - Function that fetches a page of data
	 * @param pageSize - Number of items per page (default: 50)
	 * @returns Promise with all products and pagination info
	 */
	static async fetchAllPages(
		fetchFunction: (variables: GetAllAvailableVariantsVars) => Promise<GetAllAvailableVariantsResponse>,
		pageSize: number = 50
	): Promise<PaginatedResult<GetAllAvailableVariantsResponse['products']['edges'][0]['node']>> {
		const allProducts: GetAllAvailableVariantsResponse['products']['edges'][0]['node'][] = [];
		let hasNextPage = true;
		let cursor: string | null = null;
		let totalFetched = 0;

		while (hasNextPage) {
			const variables: GetAllAvailableVariantsVars = {
				first: pageSize,
				...(cursor && { after: cursor })
			};

			const result = await fetchFunction(variables);
			
			// Add products from this page
			const products = result.products.edges.map(edge => edge.node);
			allProducts.push(...products);
			totalFetched += products.length;

			// Update pagination state
			hasNextPage = result.products.pageInfo.hasNextPage;
			cursor = result.products.pageInfo.endCursor;

			console.log(`Fetched page: ${products.length} products (total: ${totalFetched})`);
		}

		return {
			data: allProducts,
			hasNextPage: false, // We've fetched everything
			hasPreviousPage: false,
			totalFetched
		};
	}

	/**
	 * Fetches all available variants across all products with pagination
	 * @param fetchFunction - Function that fetches a page of data
	 * @param pageSize - Number of products per page (default: 50)
	 * @returns Promise with all available variants from all products
	 */
	static async fetchAllAvailableVariants(
		fetchFunction: (variables: GetAllAvailableVariantsVars) => Promise<GetAllAvailableVariantsResponse>,
		pageSize: number = 50
	): Promise<{
		allVariants: Array<{
			productId: string;
			productTitle: string;
			productHandle: string;
			variant: GetAllAvailableVariantsResponse['products']['edges'][0]['node']['variants']['edges'][0]['node'];
		}>;
		totalProducts: number;
		totalVariants: number;
	}> {
		const paginatedResult = await this.fetchAllPages(fetchFunction, pageSize);
		
		// Extract all available variants from all products
		const allVariants: Array<{
			productId: string;
			productTitle: string;
			productHandle: string;
			variant: GetAllAvailableVariantsResponse['products']['edges'][0]['node']['variants']['edges'][0]['node'];
		}> = [];

		for (const product of paginatedResult.data) {
			for (const variantEdge of product.variants.edges) {
				const variant = variantEdge.node;
				if (variant.availableForSale) {
					allVariants.push({
						productId: product.id,
						productTitle: product.title,
						productHandle: product.handle,
						variant
					});
				}
			}
		}

		return {
			allVariants,
			totalProducts: paginatedResult.totalFetched,
			totalVariants: allVariants.length
		};
	}
}


