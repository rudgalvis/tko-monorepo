import { StorefrontApi } from '$lib/shopify/StorefrontApi.js';
import { ProductsRepository } from '$lib/shopify/repositories/ProductsRepository.js';

/**
 * Example usage of pagination functionality to get all products and variants
 */

// Initialize the service
const storefrontApi = new StorefrontApi();
const productsRepository = new ProductsRepository();

export async function exampleGetAllProducts() {
	console.log('=== Getting All Products ===');
	
	try {
		// Get all products with pagination (50 products per page)
		const result = await storefrontApi.getAllProducts(50);
		
		console.log(`✅ Successfully fetched ${result.totalFetched} products`);
		console.log(`📄 Pages processed: ${Math.ceil(result.totalFetched / 50)}`);
		
		// Log first few products
		result.data.slice(0, 3).forEach((product, index) => {
			console.log(`Product ${index + 1}:`, {
				id: product.id,
				title: product.title,
				handle: product.handle,
				variantCount: product.variants.edges.length
			});
		});
		
		return result;
	} catch (error) {
		console.error('❌ Error fetching all products:', error);
		throw error;
	}
}

export async function exampleGetAllAvailableVariants() {
	console.log('=== Getting All Available Variants ===');
	
	try {
		// Get all available variants from all products
		const result = await storefrontApi.getAllAvailableVariantsFromAllProducts(50);
		
		console.log(`✅ Successfully processed ${result.totalProducts} products`);
		console.log(`🛍️ Found ${result.totalVariants} available variants`);
		
		// Log first few variants
		result.allVariants.slice(0, 3).forEach((item, index) => {
			console.log(`Variant ${index + 1}:`, {
				productTitle: item.productTitle,
				productHandle: item.productHandle,
				variantTitle: item.variant.title,
				variantId: item.variant.id,
				price: item.variant.price.amount,
				currency: item.variant.price.currencyCode,
				availableForSale: item.variant.availableForSale
			});
		});
		
		return result;
	} catch (error) {
		console.error('❌ Error fetching all available variants:', error);
		throw error;
	}
}

export async function exampleManualPagination() {
	console.log('=== Manual Pagination Example ===');
	
	try {
		let allProducts: any[] = [];
		let hasNextPage = true;
		let cursor: string | null = null;
		let pageCount = 0;
		
		while (hasNextPage) {
			pageCount++;
			console.log(`📄 Fetching page ${pageCount}...`);
			
			const result = await storefrontApi.getAllAvailableVariants({
				first: 10, // Small page size for demo
				...(cursor && { after: cursor })
			});
			
			// Add products from this page
			const products = result.products.edges.map(edge => edge.node);
			allProducts.push(...products);
			
			console.log(`   → Got ${products.length} products (total: ${allProducts.length})`);
			
			// Update pagination state
			hasNextPage = result.products.pageInfo.hasNextPage;
			cursor = result.products.pageInfo.endCursor;
			
			// Safety break to avoid infinite loops in demo
			if (pageCount >= 5) {
				console.log('   → Stopping after 5 pages for demo purposes');
				break;
			}
		}
		
		console.log(`✅ Manual pagination completed: ${allProducts.length} products across ${pageCount} pages`);
		return allProducts;
	} catch (error) {
		console.error('❌ Error in manual pagination:', error);
		throw error;
	}
}

export async function exampleGetVariantIds() {
	console.log('=== Getting All Variant IDs ===');
	
	try {
		// Get all available variant IDs
		const variantIds = await storefrontApi.getAllAvailableVariantIds(50);
		
		console.log(`✅ Successfully fetched ${variantIds.length} variant IDs`);
		
		// Log first few IDs
		console.log('First few variant IDs:', variantIds.slice(0, 5));
		
		// Convert to numeric IDs (if needed)
		const numericIds = variantIds.map(id => {
			const match = id.match(/gid:\/\/shopify\/ProductVariant\/(\d+)/);
			return match ? parseInt(match[1]) : null;
		}).filter(id => id !== null);
		
		console.log(`🔢 Converted to ${numericIds.length} numeric IDs`);
		console.log('First few numeric IDs:', numericIds.slice(0, 5));
		
		return {
			variantIds,
			numericIds
		};
	} catch (error) {
		console.error('❌ Error fetching variant IDs:', error);
		throw error;
	}
}

export async function exampleFilterAvailableVariants() {
	console.log('=== Filtering Available Variants ===');
	
	try {
		// Get all available variants
		const result = await storefrontApi.getAllAvailableVariantsFromAllProducts(50);
		
		// Filter variants by price range
		const expensiveVariants = result.allVariants.filter(item => 
			parseFloat(item.variant.price.amount) > 100
		);
		
		// Filter variants by currency
		const usdVariants = result.allVariants.filter(item => 
			item.variant.price.currencyCode === 'USD'
		);
		
		// Group by product
		const variantsByProduct = result.allVariants.reduce((acc, item) => {
			if (!acc[item.productTitle]) {
				acc[item.productTitle] = [];
			}
			acc[item.productTitle].push(item);
			return acc;
		}, {} as Record<string, any[]>);
		
		console.log(`💰 Found ${expensiveVariants.length} variants over $100`);
		console.log(`💵 Found ${usdVariants.length} USD variants`);
		console.log(`📦 Products with variants: ${Object.keys(variantsByProduct).length}`);
		
		return {
			allVariants: result.allVariants,
			expensiveVariants,
			usdVariants,
			variantsByProduct
		};
	} catch (error) {
		console.error('❌ Error filtering variants:', error);
		throw error;
	}
}

// Example usage function
export async function runAllExamples() {
	console.log('🚀 Running pagination examples...\n');
	
	try {
		await exampleGetAllProducts();
		console.log('\n' + '='.repeat(50) + '\n');
		
		await exampleGetAllAvailableVariants();
		console.log('\n' + '='.repeat(50) + '\n');
		
		await exampleGetVariantIds();
		console.log('\n' + '='.repeat(50) + '\n');
		
		await exampleManualPagination();
		console.log('\n' + '='.repeat(50) + '\n');
		
		await exampleFilterAvailableVariants();
		
		console.log('\n✅ All examples completed successfully!');
	} catch (error) {
		console.error('❌ Examples failed:', error);
	}
}
