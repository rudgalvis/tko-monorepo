/**
 * ProductPriceAnalysis Service Tests
 * 
 * NEW: CSV/JSON Export Helper Functions (similar to Product.service pattern)
 * -------------------------------------------------------------------------
 * Quick usage for one-call exports (load → analyze → export):
 * 
 * 1. Export to CSV:
 *    await analyzeAndExportToCSV('filename.json', { showPreview: true })
 * 
 * 2. Export to JSON:
 *    await analyzeAndExportToJSON('filename.json', { showPreview: true })
 * 
 * 3. Export to both CSV and JSON:
 *    await analyzeAndExportToBoth('filename.json', { showPreview: true })
 * 
 * 4. Export conflicts only:
 *    await analyzeAndExportToCSV('filename.json', { showConflictsOnly: true })
 * 
 * All exports default to:
 * - CSV: logs/ directory
 * - JSON: src/lib/data-analysis/product-prices/ directory
 * 
 * See tests below for examples!
 */

import { test } from 'vitest'
import { ProductPriceAnalysisService } from './ProductPriceAnalysis.service'
import {
	loadAndAnalyzeMockData,
	displayAnalysisResults,
	displayTableData,
	exportAnalysisToCSV,
	exportAnalysisToJSON,
	analyzeAndExportToCSV,
	analyzeAndExportToJSON,
	analyzeAndExportToBoth
} from './ProductPriceAnalysis.service.utils'

// To generate this file go: /lib/shopify/services/Product.service.test.ts and find test with [GENERATE TEST DATA]
const filename = 'variant-discounts-2025-10-30T09-41-48-971Z.json'

/**
 * Test: Load and analyze mock data with detailed output
 */
test('Load and analyze mock data - detailed view', async () => {
	const { results } = loadAndAnalyzeMockData(filename, {
		showDetails: true,
		limit: 5
	})
	
	console.log(`\nAnalyzed ${results.length} variants`)
}, { timeout: 15000 })

/**
 * Test: Load and analyze with table view
 */
test('Load and analyze mock data - table view', async () => {
	loadAndAnalyzeMockData(filename, {
		showTable: true,
		limit: 10
	})
}, { timeout: 15000 })

/**
 * Test: Show only conflicts
 */
test('Load and analyze - conflicts only', async () => {
	loadAndAnalyzeMockData(filename, {
		showDetails: true,
		showConflictsOnly: true
	})
}, { timeout: 15000 })

/**
 * Test: Export analysis to CSV
 */
test('Export analysis to CSV', async () => {
	const service = new ProductPriceAnalysisService()
	const mockData = service.loadMockData(filename)
	const results = service.analyzeAllVariants(mockData)
	
	console.log(`\nExporting ${results.length} analyzed variants to CSV...`)
	
	const csvPath = exportAnalysisToCSV(results)
	
	console.log(`Export complete: ${csvPath}`)
}, { timeout: 15000 })

/**
 * Test: Export analysis to JSON
 */
test('Export analysis to JSON', async () => {
	const service = new ProductPriceAnalysisService()
	const mockData = service.loadMockData(filename)
	const results = service.analyzeAllVariants(mockData)
	
	console.log(`\nExporting ${results.length} analyzed variants to JSON...`)
	
	const jsonPath = exportAnalysisToJSON(results, mockData)
	
	console.log(`Export complete: ${jsonPath}`)
}, { timeout: 15000 })

/**
 * Test: Analyze specific variant manually
 */
test('Analyze single variant manually', async () => {
	const service = new ProductPriceAnalysisService()
	const mockData = service.loadMockData(filename)
	
	// Get first variant
	const variant = mockData.variants[0]
	const markets = mockData.metadata.markets
	
	console.log('\n========== SINGLE VARIANT ANALYSIS ==========')
	console.log(`Variant ID: ${variant.variantId}`)
	console.log(`Base Price: ${variant.price}`)
	console.log(`Base CompareAt: ${variant.compareAtPrice}`)
	
	const analysis = service.analyzeVariant(variant, markets)
	
	console.log('\n--- Market Analyses ---')
	analysis.marketAnalyses.forEach(market => {
		console.log(`\nMarket: ${market.market}`)
		console.log(`  Price: ${market.price}`)
		console.log(`  CompareAt: ${market.compareAtPrice}`)
		console.log(`  Discount: ${market.discount}`)
		console.log(`  Actual Selling Price: ${market.actualSellingPrice}`)
		console.log(`  PDP Price: ${market.pdpPrice}`)
		console.log(`  Warnings: ${market.warnings.length}`)
		
		if (market.warnings.length > 0) {
			market.warnings.forEach(w => console.log(`    - ${w.message}`))
		}
		
		console.log(`  Discount Calculations:`)
		console.log(`    CompareAt Discount: ${market.discountCalculation.compareAtDiscountPercent}%`)
		console.log(`    Discount Amount: ${market.discountCalculation.discountAmountPercent}%`)
		console.log(`    Mismatch: ${market.discountCalculation.mismatchPercent}%`)
		console.log(`    Severity: ${market.discountCalculation.mismatchSeverity}`)
		
		console.log(`  PDP Mismatch (CRITICAL):`)
		console.log(`    Amount Difference: ${market.pdpMismatch.mismatchAmount}`)
		console.log(`    Percent Difference: ${market.pdpMismatch.mismatchPercent}%`)
		console.log(`    Severity: ${market.pdpMismatch.severity}`)
	})
}, { timeout: 15000 })

/**
 * Test: Compare both display methods side by side
 */
test('Compare display methods', async () => {
	const { results } = loadAndAnalyzeMockData(filename)
	
	console.log('\n\n========== DETAILED VIEW (First 3) ==========')
	displayAnalysisResults(results, { limit: 3 })
	
	console.log('\n\n========== TABLE VIEW (First 5) ==========')
	displayTableData(results, { limit: 5 })
}, { timeout: 15000 })

/**
 * Test: Statistics summary
 */
test('Generate statistics summary', async () => {
	const service = new ProductPriceAnalysisService()
	const mockData = service.loadMockData(filename)
	const results = service.analyzeAllVariants(mockData)
	
	console.log('\n========== ANALYSIS STATISTICS ==========')
	console.log(`Total variants: ${results.length}`)
	console.log(`Markets analyzed: ${mockData.metadata.markets.join(', ')}`)
	
	// Count variants with warnings
	const variantsWithWarnings = results.filter(r => 
		r.marketAnalyses.some(m => m.warnings.length > 0)
	).length
	console.log(`\nVariants with warnings: ${variantsWithWarnings}`)
	
	// Count conflicts
	const variantsWithConflicts = results.filter(r => 
		r.marketAnalyses.some(m => 
			m.warnings.some(w => w.type === 'compareAtAndDiscountConflict')
		)
	).length
	console.log(`Variants with conflicts: ${variantsWithConflicts}`)
	
	// Count by severity
	const severityCounts = {
		none: 0,
		minor: 0,
		moderate: 0,
		severe: 0
	}
	
	results.forEach(result => {
		result.marketAnalyses.forEach(market => {
			const severity = market.discountCalculation.mismatchSeverity
			if (severity) {
				severityCounts[severity]++
			}
		})
	})
	
	console.log('\nDiscount mismatch severity distribution:')
	console.log(`  None: ${severityCounts.none}`)
	console.log(`  Minor (<5%): ${severityCounts.minor}`)
	console.log(`  Moderate (5-15%): ${severityCounts.moderate}`)
	console.log(`  Severe (>15%): ${severityCounts.severe}`)
	
	// Count PDP mismatches (CRITICAL)
	const pdpSeverityCounts = {
		none: 0,
		minor: 0,
		moderate: 0,
		severe: 0,
		critical: 0
	}
	
	results.forEach(result => {
		result.marketAnalyses.forEach(market => {
			const severity = market.pdpMismatch.severity
			if (severity) {
				pdpSeverityCounts[severity]++
			}
		})
	})
	
	console.log('\nPDP mismatch severity distribution (CRITICAL IMPORTANCE):')
	console.log(`  None: ${pdpSeverityCounts.none}`)
	console.log(`  Minor (<1%): ${pdpSeverityCounts.minor}`)
	console.log(`  Moderate (1-5%): ${pdpSeverityCounts.moderate}`)
	console.log(`  Severe (5-10%): ${pdpSeverityCounts.severe}`)
	console.log(`  🔴 CRITICAL (>10%): ${pdpSeverityCounts.critical}`)
	
	// Find worst mismatches
	const allMarketAnalyses = results.flatMap(r => 
		r.marketAnalyses.map(m => ({
			variantId: r.variantId,
			market: m.market,
			mismatch: m.discountCalculation.mismatchPercent
		}))
	)
	
	const worstMismatches = allMarketAnalyses
		.filter(m => m.mismatch !== null)
		.sort((a, b) => (b.mismatch ?? 0) - (a.mismatch ?? 0))
		.slice(0, 5)
	
	if (worstMismatches.length > 0) {
		console.log('\nTop 5 worst discount mismatches:')
		worstMismatches.forEach((m, i) => {
			console.log(`  ${i + 1}. Variant ${m.variantId} (${m.market}): ${m.mismatch}%`)
		})
	}
	
	// Find worst PDP mismatches (CRITICAL)
	const allPdpMismatches = results.flatMap(r => 
		r.marketAnalyses.map(m => ({
			variantId: r.variantId,
			market: m.market,
			pdpMismatch: m.pdpMismatch.mismatchPercent,
			severity: m.pdpMismatch.severity
		}))
	)
	
	const worstPdpMismatches = allPdpMismatches
		.filter(m => m.pdpMismatch !== null && m.pdpMismatch > 0)
		.sort((a, b) => (b.pdpMismatch ?? 0) - (a.pdpMismatch ?? 0))
		.slice(0, 5)
	
	if (worstPdpMismatches.length > 0) {
		console.log('\n🔴 Top 5 worst PDP mismatches (CRITICAL):')
		worstPdpMismatches.forEach((m, i) => {
			const emoji = m.severity === 'critical' ? '🔴' : m.severity === 'severe' ? '🚨' : '⚠️ '
			console.log(`  ${i + 1}. ${emoji} Variant ${m.variantId} (${m.market}): ${m.pdpMismatch}% (${m.severity?.toUpperCase()})`)
		})
	}
}, { timeout: 15000 })

/**
 * Test: One-call CSV export (similar to Product.service pattern)
 * This combines load → analyze → export in a single function call
 */
test('Analyze and export to CSV - one call', async () => {
	const csvPath = await analyzeAndExportToCSV(filename, {
		showPreview: true,
		previewLimit: 5
	})
	
	console.log(`\n✅ CSV exported to: ${csvPath}`)
}, { timeout: 15000 })

/**
 * Test: One-call JSON export (similar to Product.service pattern)
 * This combines load → analyze → export in a single function call
 */
test('Analyze and export to JSON - one call', async () => {
	const jsonPath = await analyzeAndExportToJSON(filename, {
		showPreview: true,
		previewLimit: 5
	})
	
	console.log(`\n✅ JSON exported to: ${jsonPath}`)
}, { timeout: 15000 })

/**
 * Test: Export conflicts only to CSV
 */
test('Analyze and export conflicts only to CSV', async () => {
	const csvPath = await analyzeAndExportToCSV(filename, {
		showPreview: true,
		previewLimit: 10,
		showConflictsOnly: true
	})
	
	console.log(`\n✅ Conflicts CSV exported to: ${csvPath}`)
}, { timeout: 15000 })

/**
 * Test: Export to both CSV and JSON in one call
 */
test('Analyze and export to both CSV and JSON - one call', async () => {
	const { csvPath, jsonPath } = await analyzeAndExportToBoth(filename, {
		showPreview: true,
		previewLimit: 5
	})
	
	console.log(`\n✅ Exports completed:`)
	console.log(`   CSV: ${csvPath}`)
	console.log(`   JSON: ${jsonPath}`)
}, { timeout: 15000 })

