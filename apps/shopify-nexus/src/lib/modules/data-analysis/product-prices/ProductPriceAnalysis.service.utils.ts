import { writeFileSync } from 'fs'
import { join } from 'path'
import type { VariantAnalysisResult, MarketAnalysis, MockDataExport } from './ProductPriceAnalysis.service'
import { ProductPriceAnalysisService } from './ProductPriceAnalysis.service'

/**
 * Displays analysis results in a readable console format
 * @param results - Array of variant analysis results
 * @param options - Display options
 */
export function displayAnalysisResults(
	results: VariantAnalysisResult[],
	options: {
		limit?: number
		showWarningsOnly?: boolean
		showConflictsOnly?: boolean
	} = {}
) {
	const { limit, showWarningsOnly = false, showConflictsOnly = false } = options
	
	// Filter results if needed
	let filteredResults = results
	
	if (showWarningsOnly) {
		filteredResults = results.filter(r => 
			r.marketAnalyses.some(m => m.warnings.length > 0)
		)
	}
	
	if (showConflictsOnly) {
		filteredResults = results.filter(r => 
			r.marketAnalyses.some(m => 
				m.warnings.some(w => w.type === 'compareAtAndDiscountConflict')
			)
		)
	}
	
	const displayResults = limit ? filteredResults.slice(0, limit) : filteredResults
	
	console.log(`\n========== PRODUCT PRICE ANALYSIS ==========`)
	console.log(`Total variants analyzed: ${results.length}`)
	console.log(`Variants with warnings: ${results.filter(r => r.marketAnalyses.some(m => m.warnings.length > 0)).length}`)
	console.log(`Variants with conflicts: ${results.filter(r => r.marketAnalyses.some(m => m.warnings.some(w => w.type === 'compareAtAndDiscountConflict'))).length}`)
	
	if (showWarningsOnly) {
		console.log(`\nShowing only variants with warnings (${filteredResults.length} total)`)
	}
	
	if (showConflictsOnly) {
		console.log(`\nShowing only variants with conflicts (${filteredResults.length} total)`)
	}
	
	console.log('\n--- Variant Details ---\n')
	
	displayResults.forEach((result, index) => {
		console.log(`\n[${index + 1}] Variant: ${result.variantId}`)
		console.log(`    URL: ${result.url}`)
		console.log(`    Base Price: ${result.basePrice}`)
		console.log(`    Base CompareAt: ${result.baseCompareAtPrice ?? 'N/A'}`)
		
		result.marketAnalyses.forEach(market => {
			displayMarketAnalysis(market)
		})
	})
	
	if (limit && filteredResults.length > limit) {
		console.log(`\n... and ${filteredResults.length - limit} more variants`)
	}
}

/**
 * Displays a single market analysis
 * @param market - Market analysis data
 */
function displayMarketAnalysis(market: MarketAnalysis) {
	console.log(`\n    Market: ${market.market}`)
	console.log(`      Price: ${market.price ?? 'N/A'}`)
	console.log(`      CompareAt: ${market.compareAtPrice ?? 'N/A'}`)
	console.log(`      Discount: ${market.discount ?? 'N/A'}`)
	console.log(`      Actual Selling Price: ${market.actualSellingPrice ?? 'N/A'}`)
	console.log(`      PDP Price: ${market.pdpPrice ?? 'N/A'}`)
	
	// Display warnings
	if (market.warnings.length > 0) {
		console.log(`      ⚠️  WARNINGS:`)
		market.warnings.forEach(warning => {
			console.log(`        - ${warning.message}`)
		})
	}
	
	// Display discount calculations
	const dc = market.discountCalculation
	console.log(`      Discount Calculations:`)
	
	if (dc.compareAtDiscountPercent !== null) {
		console.log(`        CompareAt Discount: ${dc.compareAtDiscountPercent}%`)
	}
	
	if (dc.discountAmountPercent !== null) {
		console.log(`        Discount Amount: ${dc.discountAmountPercent}%`)
	}
	
	if (dc.mismatchPercent !== null && dc.mismatchSeverity !== null) {
		const severityEmoji = {
			none: '✅',
			minor: '⚠️ ',
			moderate: '⚠️ ',
			severe: '🚨'
		}[dc.mismatchSeverity]
		
		console.log(`        ${severityEmoji} Mismatch: ${dc.mismatchPercent}% (${dc.mismatchSeverity.toUpperCase()})`)
	}
	
	// Display PDP mismatch (CRITICAL)
	const pdp = market.pdpMismatch
	if (pdp.mismatchAmount !== null || pdp.mismatchPercent !== null) {
		console.log(`      PDP Mismatch (CRITICAL):`)
		
		if (pdp.mismatchAmount !== null) {
			console.log(`        Amount Difference: ${pdp.mismatchAmount}`)
		}
		
		if (pdp.mismatchPercent !== null && pdp.severity !== null) {
			const pdpSeverityEmoji = {
				none: '✅',
				minor: '⚠️ ',
				moderate: '⚠️ ',
				severe: '🚨',
				critical: '🔴'
			}[pdp.severity]
			
			console.log(`        ${pdpSeverityEmoji} Percent Difference: ${pdp.mismatchPercent}% (${pdp.severity.toUpperCase()})`)
		}
	}
}

/**
 * Builds a flattened table data structure for console.table or CSV export
 * @param results - Analysis results
 * @returns Flattened table data
 */
export function buildTableData(results: VariantAnalysisResult[]) {
	return results.map(result => {
		const row: Record<string, unknown> = {
			productId: result.productId,
			variantId: result.variantId,
			basePrice: result.basePrice,
			baseCompareAt: result.baseCompareAtPrice,
			url: result.url
		}
		
		// Add market-specific columns
		result.marketAnalyses.forEach(market => {
			const prefix = market.market
			
			row[`${prefix}_price`] = market.price
			row[`${prefix}_compareAt`] = market.compareAtPrice
			row[`${prefix}_discount`] = market.discount
			row[`${prefix}_actualPrice`] = market.actualSellingPrice
			row[`${prefix}_pdpPrice`] = market.pdpPrice
			row[`${prefix}_hasConflict`] = market.warnings.length > 0 ? 'YES' : 'NO'
			row[`${prefix}_compareAtDiscount%`] = market.discountCalculation.compareAtDiscountPercent
			row[`${prefix}_discountAmount%`] = market.discountCalculation.discountAmountPercent
			row[`${prefix}_mismatch%`] = market.discountCalculation.mismatchPercent
			row[`${prefix}_severity`] = market.discountCalculation.mismatchSeverity
			// PDP Mismatch (CRITICAL)
			row[`${prefix}_pdpMismatchAmount`] = market.pdpMismatch.mismatchAmount
			row[`${prefix}_pdpMismatch%`] = market.pdpMismatch.mismatchPercent
			row[`${prefix}_pdpSeverity`] = market.pdpMismatch.severity
		})
		
		return row
	})
}

/**
 * Displays table data using console.table
 * @param results - Analysis results
 * @param options - Display options
 */
export function displayTableData(
	results: VariantAnalysisResult[],
	options: {
		limit?: number
		showConflictsOnly?: boolean
	} = {}
) {
	const { limit, showConflictsOnly = false } = options
	
	let tableData = buildTableData(results)
	
	if (showConflictsOnly) {
		tableData = tableData.filter(row => {
			// Check if any market has a conflict
			return Object.keys(row).some(key => 
				key.endsWith('_hasConflict') && row[key] === 'YES'
			)
		})
	}
	
	const displayData = limit ? tableData.slice(0, limit) : tableData
	
	console.log(`\n========== ANALYSIS TABLE ==========`)
	console.log(`Total rows: ${tableData.length}`)
	
	if (showConflictsOnly) {
		console.log(`Showing only conflicts`)
	}
	
	console.table(displayData)
	
	if (limit && tableData.length > limit) {
		console.log(`\n... and ${tableData.length - limit} more rows`)
	}
}

/**
 * Exports analysis results to CSV
 * @param results - Analysis results
 * @param outputPath - Optional custom output path
 * @returns Path to exported CSV file
 */
export function exportAnalysisToCSV(
	results: VariantAnalysisResult[],
	outputPath?: string
): string {
	const tableData = buildTableData(results)
	
	if (tableData.length === 0) {
		throw new Error('No data to export')
	}
	
	// Build CSV header from first row keys
	const headers = Object.keys(tableData[0])
	const csvLines: string[] = [headers.map(h => `"${h}"`).join(',')]
	
	// Build CSV rows
	tableData.forEach(row => {
		const values = headers.map(header => {
			const value = row[header]
			return value === null || value === undefined ? '' : value
		})
		csvLines.push(values.map(v => `"${v}"`).join(','))
	})
	
	const csvContent = csvLines.join('\n')
	
	// Determine output path
	const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
	const filename = `price-analysis-${timestamp}.csv`
	const defaultPath = join(process.cwd(), 'logs', filename)
	const filepath = outputPath || defaultPath
	
	try {
		writeFileSync(filepath, csvContent, 'utf-8')
		console.log(`\n✅ Analysis CSV exported to: ${filepath}`)
		console.log(`Total rows: ${tableData.length}`)
		return filepath
	} catch (error) {
		throw new Error(`Failed to write CSV file: ${error}`)
	}
}

/**
 * Exports analysis results to JSON
 * @param results - Analysis results
 * @param mockData - Original mock data for metadata
 * @param outputPath - Optional custom output path
 * @returns Path to exported JSON file
 */
export function exportAnalysisToJSON(
	results: VariantAnalysisResult[],
	mockData: MockDataExport,
	outputPath?: string
): string {
	const jsonData = {
		metadata: {
			...mockData.metadata,
			analyzedAt: new Date().toISOString(),
			totalVariants: results.length,
			variantsWithWarnings: results.filter(r => 
				r.marketAnalyses.some(m => m.warnings.length > 0)
			).length,
			variantsWithConflicts: results.filter(r => 
				r.marketAnalyses.some(m => 
					m.warnings.some(w => w.type === 'compareAtAndDiscountConflict')
				)
			).length
		},
		analysis: results
	}
	
	// Determine output path
	const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
	const filename = `price-analysis-${timestamp}.json`
	const defaultPath = join(process.cwd(), 'src', 'lib', 'data-analysis', 'product-prices', filename)
	const filepath = outputPath || defaultPath
	
	try {
		const jsonContent = JSON.stringify(jsonData, null, 2)
		writeFileSync(filepath, jsonContent, 'utf-8')
		console.log(`\n✅ Analysis JSON exported to: ${filepath}`)
		console.log(`Total variants: ${results.length}`)
		return filepath
	} catch (error) {
		throw new Error(`Failed to write JSON file: ${error}`)
	}
}

/**
 * Main utility function to load and analyze mock data
 * @param filename - JSON filename to load
 * @param displayOptions - Options for displaying results
 * @returns Analysis results
 */
export function loadAndAnalyzeMockData(
	filename: string,
	displayOptions?: {
		showDetails?: boolean
		showTable?: boolean
		limit?: number
		showConflictsOnly?: boolean
	}
) {
	const service = new ProductPriceAnalysisService()
	
	console.log(`\n========== LOADING MOCK DATA ==========`)
	console.log(`Filename: ${filename}`)
	
	const mockData = service.loadMockData(filename)
	
	console.log(`Markets: ${mockData.metadata.markets.join(', ')}`)
	console.log(`Total variants: ${mockData.variants.length}`)
	
	const results = service.analyzeAllVariants(mockData)
	
	// Display results based on options
	if (displayOptions?.showDetails) {
		displayAnalysisResults(results, {
			limit: displayOptions.limit,
			showConflictsOnly: displayOptions.showConflictsOnly
		})
	}
	
	if (displayOptions?.showTable) {
		displayTableData(results, {
			limit: displayOptions.limit,
			showConflictsOnly: displayOptions.showConflictsOnly
		})
	}
	
	return {
		mockData,
		results
	}
}

/**
 * Helper function to load mock data, analyze, and export to CSV in one call
 * Similar to exportVariantsToCSV in Product.service.test.utils.ts
 * @param filename - JSON filename to load and analyze
 * @param options - Export and display options
 * @returns Path to exported CSV file
 */
export async function analyzeAndExportToCSV(
	filename: string,
	options: {
		showPreview?: boolean
		previewLimit?: number
		showConflictsOnly?: boolean
		outputPath?: string
	} = {}
) {
	const { showPreview = true, previewLimit = 10, showConflictsOnly = false, outputPath } = options
	
	console.log(`\n========== ANALYZE AND EXPORT TO CSV ==========`)
	console.log(`Loading and analyzing: ${filename}`)
	
	// Load and analyze mock data
	const service = new ProductPriceAnalysisService()
	const mockData = service.loadMockData(filename)
	const results = service.analyzeAllVariants(mockData)
	
	console.log(`Markets: ${mockData.metadata.markets.join(', ')}`)
	console.log(`Total variants analyzed: ${results.length}`)
	
	const variantsWithConflicts = results.filter(r => 
		r.marketAnalyses.some(m => 
			m.warnings.some(w => w.type === 'compareAtAndDiscountConflict')
		)
	).length
	console.log(`Variants with conflicts: ${variantsWithConflicts}`)
	
	// Show preview if requested
	if (showPreview) {
		console.log('\n--- Preview of Analysis ---')
		displayTableData(results, {
			limit: previewLimit,
			showConflictsOnly
		})
	}
	
	// Export to CSV
	const csvPath = exportAnalysisToCSV(results, outputPath)
	
	return csvPath
}

/**
 * Helper function to load mock data, analyze, and export to JSON in one call
 * Similar to exportVariantsToJSON in Product.service.test.utils.ts
 * @param filename - JSON filename to load and analyze
 * @param options - Export and display options
 * @returns Path to exported JSON file
 */
export async function analyzeAndExportToJSON(
	filename: string,
	options: {
		showPreview?: boolean
		previewLimit?: number
		showConflictsOnly?: boolean
		outputPath?: string
	} = {}
) {
	const { showPreview = true, previewLimit = 10, showConflictsOnly = false, outputPath } = options
	
	console.log(`\n========== ANALYZE AND EXPORT TO JSON ==========`)
	console.log(`Loading and analyzing: ${filename}`)
	
	// Load and analyze mock data
	const service = new ProductPriceAnalysisService()
	const mockData = service.loadMockData(filename)
	const results = service.analyzeAllVariants(mockData)
	
	console.log(`Markets: ${mockData.metadata.markets.join(', ')}`)
	console.log(`Total variants analyzed: ${results.length}`)
	
	const variantsWithConflicts = results.filter(r => 
		r.marketAnalyses.some(m => 
			m.warnings.some(w => w.type === 'compareAtAndDiscountConflict')
		)
	).length
	console.log(`Variants with conflicts: ${variantsWithConflicts}`)
	
	// Show preview if requested
	if (showPreview) {
		console.log('\n--- Preview of Analysis ---')
		displayTableData(results, {
			limit: previewLimit,
			showConflictsOnly
		})
	}
	
	// Export to JSON
	const jsonPath = exportAnalysisToJSON(results, mockData, outputPath)
	
	return jsonPath
}

/**
 * Helper function to load mock data, analyze, and export to both CSV and JSON
 * @param filename - JSON filename to load and analyze
 * @param options - Export and display options
 * @returns Paths to exported files
 */
export async function analyzeAndExportToBoth(
	filename: string,
	options: {
		showPreview?: boolean
		previewLimit?: number
		showConflictsOnly?: boolean
		csvOutputPath?: string
		jsonOutputPath?: string
	} = {}
) {
	const { showPreview = true, previewLimit = 10, showConflictsOnly = false, csvOutputPath, jsonOutputPath } = options
	
	console.log(`\n========== ANALYZE AND EXPORT TO CSV + JSON ==========`)
	console.log(`Loading and analyzing: ${filename}`)
	
	// Load and analyze mock data
	const service = new ProductPriceAnalysisService()
	const mockData = service.loadMockData(filename)
	const results = service.analyzeAllVariants(mockData)
	
	console.log(`Markets: ${mockData.metadata.markets.join(', ')}`)
	console.log(`Total variants analyzed: ${results.length}`)
	
	const variantsWithConflicts = results.filter(r => 
		r.marketAnalyses.some(m => 
			m.warnings.some(w => w.type === 'compareAtAndDiscountConflict')
		)
	).length
	console.log(`Variants with conflicts: ${variantsWithConflicts}`)
	
	// Show preview if requested
	if (showPreview) {
		console.log('\n--- Preview of Analysis ---')
		displayTableData(results, {
			limit: previewLimit,
			showConflictsOnly
		})
	}
	
	// Export to both formats
	const csvPath = exportAnalysisToCSV(results, csvOutputPath)
	const jsonPath = exportAnalysisToJSON(results, mockData, jsonOutputPath)
	
	console.log(`\n✅ Both exports completed successfully`)
	
	return {
		csvPath,
		jsonPath
	}
}

