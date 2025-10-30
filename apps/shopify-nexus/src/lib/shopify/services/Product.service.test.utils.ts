import { writeFileSync } from 'fs'
import { join } from 'path'
import { ProductService } from './Product.service'

export interface ResultDisplay {
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

export function displayResult(label: string, result: ResultDisplay, limit?: number, additionalColumns?: string[]) {
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
		// For market-specific pricing, create columns for price and compareAtPrice per market
		let columns = ['price', 'compareAtPrice']
		
		if (additionalColumns && additionalColumns.length > 0) {
			// For each market, add price, compareAtPrice, and discount columns
			const marketColumns: string[] = []
			additionalColumns.forEach(market => {
				marketColumns.push(`${market}_price`)
				marketColumns.push(`${market}_compareAtPrice`)
				marketColumns.push(`${market}_discount`)
			})
			columns = [...columns, ...marketColumns]
		}
		
		columns.push('url')
		
		// Transform data to flatten market pricing for console.table
		const transformedData = displayData.map(row => {
			const transformed: Record<string, unknown> = {
				price: row.price,
				compareAtPrice: row.compareAtPrice,
				url: row.url
			}
			
			// Add market-specific columns
			if (additionalColumns && additionalColumns.length > 0) {
				additionalColumns.forEach(market => {
					const priceData = (row as Record<string, unknown>)[`${market}_price`]
					const compareAtPriceData = (row as Record<string, unknown>)[`${market}_compareAtPrice`]
					const discountData = (row as Record<string, unknown>)[`${market}_discount`]
					
					// Market prices are now stored directly as string values
					transformed[`${market}_price`] = priceData ?? ''
					transformed[`${market}_compareAtPrice`] = compareAtPriceData ?? ''
					
					// Add discount column if it exists
					if (discountData !== undefined) {
						transformed[`${market}_discount`] = discountData
					}
				})
			}
			
			return transformed
		})
		
		console.table(transformedData, columns)
		
		if (limit && result.tableData.length > limit) {
			console.log(`... and ${result.tableData.length - limit} more`)
		}
	} else {
		console.log('\nNo active products with compareAtPrice found')
	}
}

/**
 * Helper function to build CSV content from table data
 * Handles contextual pricing (numeric values) and discount amounts (market_discount keys)
 */
export function buildCsvFromTableData(tableData: ResultDisplay['tableData'], markets: string[]): string {
	if (tableData.length === 0) {
		return ''
	}
	
	// Build CSV header - include both market pricing and discount columns
	const marketHeaders = markets.flatMap(market => [
		`${market}_price`,
		`${market}_compareAtPrice`,
		`${market}_discount`
	])
	const headers = ['productId', 'variantId', 'price', 'compareAtPrice', ...marketHeaders, 'url']
	const csvLines: string[] = [headers.map(h => `"${h}"`).join(',')]
	
	// Build CSV rows
	tableData.forEach(row => {
		const marketValues = markets.flatMap(market => {
			const priceData = (row as Record<string, unknown>)[`${market}_price`] ?? ''
			const compareAtPriceData = (row as Record<string, unknown>)[`${market}_compareAtPrice`] ?? ''
			const discountData = (row as Record<string, unknown>)[`${market}_discount`] ?? ''
			
			return [priceData, compareAtPriceData, discountData]
		})
		
		const values = [
			row.productId,
			row.variantId,
			row.price,
			row.compareAtPrice || '',
			...marketValues,
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
export async function exportVariantsToCSV(
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
	
	displayResult(`EXPORT CSV DATA ${debugLabel}`, result, isDebug ? 10 : undefined, markets)
	
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

/**
 * Helper function to export variant discount data to JSON
 * Stores complete dataset with full metadata for data analysis
 * @param productService - Instance of ProductService
 * @param markets - Array of ISO country codes for market-specific pricing
 * @param options - Configuration options for fetching and exporting
 * @param outputPath - Optional custom output path (defaults to data-analysis/product-prices/)
 * @returns Path to the exported JSON file
 */
export async function exportVariantsToJSON(
	productService: ProductService,
	markets: string[],
	options: {
		pageSize: number
		numberOfPages?: number
		pageNumber: number
		logPreview?: boolean
	},
	outputPath?: string
) {
	const { pageSize, numberOfPages, pageNumber, logPreview = false } = options
	
	console.log(`\n========== EXPORTING TO JSON ==========`)
	console.log(`Fetching variants (page size: ${pageSize}, pages: ${numberOfPages || 'all'}) for markets: ${markets.join(', ')}`)
	
	const result = await productService.getVariantsWithDiscountsByMarket(markets, pageSize, numberOfPages, pageNumber)
	
	displayResult('EXPORT JSON DATA', result, 10, markets)
	
	if (result.tableData.length === 0) {
		console.log('No data to export')
		return null
	}
	
	// Build structured JSON with metadata
	const jsonData = {
		metadata: {
			exportedAt: new Date().toISOString(),
			markets: markets,
			pageSize: pageSize,
			numberOfPages: numberOfPages || 'all',
			startPage: pageNumber,
			summary: result.summary
		},
		variants: result.tableData
	}
	
	// Determine output directory and file path
	const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
	const filename = `variant-discounts-mock-${timestamp}.json`
	const defaultPath = join(process.cwd(), 'src', 'lib', 'data-analysis', 'product-prices', filename)
	const filepath = outputPath || defaultPath
	
	try {
		// Pretty-print JSON with 2-space indentation
		const jsonContent = JSON.stringify(jsonData, null, 2)
		
		writeFileSync(filepath, jsonContent, 'utf-8')
		console.log(`\n✅ JSON exported successfully to: ${filepath}`)
		console.log(`Total variants exported: ${result.tableData.length}`)
		
		// Log preview if requested
		if (logPreview) {
			console.log('\n--- JSON Structure Preview ---')
			console.log(JSON.stringify({
				metadata: jsonData.metadata,
				variants: jsonData.variants.slice(0, 2)
			}, null, 2))
			console.log('...')
		}
		
		return filepath
	} catch (error) {
		console.error(`Failed to write JSON file: ${error}`)
		return null
	}
}

