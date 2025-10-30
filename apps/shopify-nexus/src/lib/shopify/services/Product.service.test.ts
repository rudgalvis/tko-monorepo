import { ProductService } from '$lib/shopify/services/Product.service'
import { test } from 'vitest'
import { displayResult, exportVariantsToCSV, exportVariantsToJSON } from './Product.service.test.utils'

test('should fetch all available variants with compareAtPrice', async () => {
	const productService = new ProductService()
	const result = await productService.getAllAvailableVariantsWithCompareAtPrice()
	displayResult('SUMMARY', result)
}, {timeout: 15000})

test('should support pagination offset starting from page specific with market-specific pricing', async () => {
	const productService = new ProductService()
    const markets = ['LT', 'AU']
	const result = await productService.getAllAvailableVariantsWithCompareAtPrice(50, 1, 8, markets)
	displayResult('OFFSET RUN SUMMARY', result, 5, markets)
}, {timeout: 15000})

test('should calculate and fetch variants with market-specific discount data', async () => {
	const productService = new ProductService()
	const result = await productService.getVariantsWithDiscountsByMarket(['US'], 50, 1, 8)
	displayResult('VARIANTS WITH MARKET DISCOUNTS', result, 100, result.summary.marketsChecked)
}, {timeout: 60000})

/**
 * Developer utility test - Exports variant discount data to CSV file
 * Run this to extract market discount data into a CSV file for analysis
 */
test('[UTILITY] should export complete variant discount dataset to CSV for all markets', async () => {
	const productService = new ProductService()
	const markets = ['US', 'CA', 'GB', 'LT', 'AU']
	
	await exportVariantsToCSV(productService, markets, { pageSize: 200, numberOfPages: undefined, pageNumber: 1, isDebug: false, logPreview: false })
}, {timeout: 120000})

/**
 * Developer debug test - Small dataset CSV export
 * Run this to test CSV export logic with a small chunk of data (1 page)
 * Useful for identifying formatting problems before running full dataset
 */
test('[DEBUG] should export small variant dataset to CSV with preview', async () => {
	const productService = new ProductService()
	const markets = [/* 'US', 'CA', 'GB',*/ 'LT',  'AU']
	
	await exportVariantsToCSV(productService, markets, { pageSize: 50, numberOfPages: 1, pageNumber: 8, isDebug: true, logPreview: true })
}, {timeout: 30000})

test('should fetch variants with contextual pricing across multiple markets', async () => {
	const service = new ProductService()

    const markets = ['US', 'CA', 'GB', 'LT', 'AU']
	
	// Fetch 10 pages of variants with pricing for multiple markets
	const result = await service.getAllAvailableVariantsWithCompareAtPrice(
		250,      // pageSize
		10,        // numberOfPages
		1,        // startPage
        markets // markets
	)
	
	displayResult('MARKET-SPECIFIC PRICING', result, 10, markets)
}, { timeout: 30000 })

/**
 * Developer utility test - Exports small variant discount dataset to JSON for data analysis
 * Run this to create mock data for developing and testing data analysis logic
 * Stored in: src/lib/data-analysis/product-prices/
 */
test('[MOCK DATA] should export small variant dataset to JSON for analysis', async () => {
	const productService = new ProductService()
	const markets = ['US', 'LT']
	
	await exportVariantsToJSON(productService, markets, { 
		pageSize: 50, 
		numberOfPages: 1, 
		pageNumber: 8, 
		logPreview: true 
	})
}, {timeout: 30000})

