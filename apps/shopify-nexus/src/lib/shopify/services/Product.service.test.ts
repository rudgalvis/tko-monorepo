import { ProductService } from '$lib/shopify/services/Product.service'
import { test } from 'vitest'

interface ResultDisplay {
	summary: {
		pageRange: string
		pageCount?: number
		startPage?: number
		totalVariantsChecked: number
		activeVariantsCount: number
		archivedDraftCount: number
	}
	tableData: Array<{ url: string; price: string; compareAtPrice: string }>
}

function displayResult(label: string, result: ResultDisplay, limit?: number) {
	console.log(`\n========== ${label} ==========`)
	
	// Display summary as regular console.log
	console.log(`Pages: ${
		result.summary.pageCount 
			? `${result.summary.pageRange} (${result.summary.pageCount} pages total)`
			: result.summary.startPage
			? `${result.summary.pageRange} (started from page ${result.summary.startPage})`
			: result.summary.pageRange
	}`)
	console.log(`Total variants checked: ${result.summary.totalVariantsChecked}`)
	console.log(`Active products with compareAtPrice: ${result.summary.activeVariantsCount}`)
	console.log(`Archived/Draft products: ${result.summary.archivedDraftCount}`)
	
	// Display table data using console.table
	if (result.tableData.length > 0) {
		console.log('\n--- Product Data ---')
		const displayData = limit ? result.tableData.slice(0, limit) : result.tableData
		console.table(displayData, ['price', 'compareAtPrice', 'url'])
		
		if (limit && result.tableData.length > limit) {
			console.log(`... and ${result.tableData.length - limit} more`)
		}
	} else {
		console.log('\nNo active products with compareAtPrice found')
	}
}

test('Get all available variant IDs with compared_at price', async () => {
	const productService = new ProductService()
	const result = await productService.getAllAvailableVariantsWithCompareAtPrice()
	displayResult('SUMMARY', result)
}, {timeout: 15000})

test('Get variants with compared_at price - partial run (2 pages)', async () => {
	const productService = new ProductService()
	const result = await productService.getAllAvailableVariantsWithCompareAtPrice(50, 2)
	displayResult('PARTIAL RUN SUMMARY', result, 5)
}, {timeout: 15000})

test('Get variants with compared_at price - with offset (start from page 3)', async () => {
	const productService = new ProductService()
	const result = await productService.getAllAvailableVariantsWithCompareAtPrice(50, 1, 8)
	displayResult('OFFSET RUN SUMMARY', result, 5)
}, {timeout: 15000})

test('table', () => {
    console.table([{price: 20, compareAtPrice: 30}], ['price', 'compareAtPrice'])
})

