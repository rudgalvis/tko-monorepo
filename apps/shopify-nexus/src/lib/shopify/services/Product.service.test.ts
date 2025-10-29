import { ProductService } from '$lib/shopify/services/Product.service'
import { test } from 'vitest'
import { writeFileSync } from 'fs'
import { join } from 'path'

interface ResultDisplay {
	summary: {
		pageRange: string
		pageCount?: number
		startPage?: number
		totalVariantsChecked: number
		activeVariantsCount: number
		archivedDraftCount: number
		marketsChecked?: string[]
	}
	tableData: Array<{ url: string; price: string; compareAtPrice: string | null; [key: string]: unknown }>
}

function displayResult(label: string, result: ResultDisplay, limit?: number, additionalColumns?: string[]) {
	console.log(`\n========== ${label} ==========`)
	
	// Display markets if available
	if (result.summary.marketsChecked) {
		console.log(`Markets checked: ${result.summary.marketsChecked.join(', ')}`)
	}
	
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
		
		// Build columns list: base columns + any additional columns (like market codes)
		const columns = ['price', 'compareAtPrice', ...(additionalColumns || []), 'url']
		console.table(displayData, columns)
		
		if (limit && result.tableData.length > limit) {
			console.log(`... and ${result.tableData.length - limit} more`)
		}
	} else {
		console.log('\nNo active products with compareAtPrice found')
	}
}

/**
 * Helper function to build CSV content from table data
 */
function buildCsvFromTableData(tableData: ResultDisplay['tableData'], markets: string[]): string {
	if (tableData.length === 0) {
		return ''
	}
	
	// Build CSV header
	const headers = ['productId', 'variantId', 'price', 'compareAtPrice', ...markets, 'url']
	const csvLines: string[] = [headers.map(h => `"${h}"`).join(',')]
	
	// Build CSV rows
	tableData.forEach(row => {
		const values = [
			row.productId,
			row.variantId,
			row.price,
			row.compareAtPrice || '',
			...markets.map(market => (row as Record<string, unknown>)[market] ?? ''),
			row.url
		]
		csvLines.push(values.map(v => `"${v}"`).join(','))
	})
	
	return csvLines.join('\n')
}

/**
 * Helper function to export variant discount data to CSV
 * Handles both small debug and full-scale exports
 */
async function exportVariantsToCSV(
	productService: ProductService,
	markets: string[],
	options: {
		pageSize: number
		numberOfPages?: number
		pageNumber: number
		isDebug?: boolean
		logPreview?: boolean
	}
) {
	const { pageSize, numberOfPages, pageNumber, isDebug = false, logPreview = false } = options
	const debugLabel = isDebug ? 'DEBUG ' : ''
	
	console.log(`\n========== EXPORTING TO CSV ${debugLabel}==========`)
	console.log(`Fetching variants (page size: ${pageSize}, pages: ${numberOfPages || 'all'}) for markets: ${markets.join(', ')}`)
	
	const result = await productService.getVariantsWithDiscountsByMarket(markets, pageSize, numberOfPages, pageNumber)
	
	displayResult(`EXPORT CSV DATA ${debugLabel}`, result, isDebug ? 10 : undefined, result.summary.marketsChecked)
	
	if (result.tableData.length === 0) {
		console.log('No data to export')
		return
	}
	
	const csvContent = buildCsvFromTableData(result.tableData, markets)
	
	// Write to file
	const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
	const debugPrefix = isDebug ? 'DEBUG-' : ''
	const filename = `variant-discounts-${debugPrefix}${timestamp}.csv`
	const filepath = join(process.cwd(), 'logs', filename)
	
	try {
		writeFileSync(filepath, csvContent, 'utf-8')
		console.log(`\n✅ CSV exported successfully to: logs/${filename}`)
		console.log(`Total rows exported: ${result.tableData.length}`)
		
		// Log preview if requested
		if (logPreview) {
			console.log('\n--- First rows of CSV ---')
			const lines = csvContent.split('\n')
			lines.slice(0, 4).forEach(line => console.log(line))
			if (lines.length > 4) {
				console.log('...')
			}
		}
	} catch (error) {
		console.error(`Failed to write CSV file: ${error}`)
	}
}

test('Get all available variant IDs with compared_at price', async () => {
	const productService = new ProductService()
	const result = await productService.getAllAvailableVariantsWithCompareAtPrice()
	displayResult('SUMMARY', result)
}, {timeout: 15000})

test('Get variants with compared_at price - with offset (start from page 3)', async () => {
	const productService = new ProductService()
	const result = await productService.getAllAvailableVariantsWithCompareAtPrice(50, 1, 8)
	displayResult('OFFSET RUN SUMMARY', result, 5)
}, {timeout: 15000})

test('Get variants with discounts by market', async () => {
	const productService = new ProductService()
	const result = await productService.getVariantsWithDiscountsByMarket(['US', 'GB'], 200, 1, 3)
	displayResult('VARIANTS WITH MARKET DISCOUNTS', result, 100, result.summary.marketsChecked)
}, {timeout: 60000})


/**
 * Developer utility test - Exports variant discount data to CSV file
 * Run this to extract market discount data into a CSV file for analysis
 */
test('Export variants with discounts by market to CSV', async () => {
	const productService = new ProductService()
	const markets = ['US', 'CA', 'GB', 'LT', 'AU']
	
	await exportVariantsToCSV(productService, markets, { pageSize: 200, numberOfPages: undefined, pageNumber: 1, isDebug: false, logPreview: false })
}, {timeout: 120000})


/**
 * Developer debug test - Small dataset CSV export
 * Run this to test CSV export logic with a small chunk of data (1 page)
 * Useful for identifying formatting problems before running full dataset
 */
test('Export small chunk of variants to CSV (debug)', async () => {
	const productService = new ProductService()
	const markets = ['US', 'CA', 'GB', 'LT', 'AU']
	
	await exportVariantsToCSV(productService, markets, { pageSize: 50, numberOfPages: 1, pageNumber: 8, isDebug: true, logPreview: true })
}, {timeout: 30000})



