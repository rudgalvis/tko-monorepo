import { readFileSync } from 'fs'
import { join } from 'path'

export interface VariantDiscountData {
	url: string
	productId: string
	variantId: string
	price: string
	compareAtPrice: string | null
	[key: string]: string | number | null | undefined // For market-specific fields
}

export interface MockDataExport {
	metadata: {
		exportedAt: string
		markets: string[]
		pageSize: number
		numberOfPages: number | string
		startPage: number
		summary: {
			totalVariantsChecked: number
			activeVariantsCount: number
			archivedDraftCount: number
			pageCount: number
			startPage: number
			endPage: number
			pageRange: string
			marketsRequested: string[]
			marketsChecked: string[]
		}
	}
	variants: VariantDiscountData[]
}

export interface MarketPriceWarning {
	type: 'compareAtAndDiscountConflict'
	message: string
}

export interface DiscountCalculation {
	/** The discount percentage from compareAtPrice comparison */
	compareAtDiscountPercent: number | null
	/** The discount percentage from discount amount comparison */
	discountAmountPercent: number | null
	/** If both calculations exist, the absolute difference between them */
	mismatchPercent: number | null
	/** Human-readable explanation of the mismatch severity */
	mismatchSeverity: 'none' | 'minor' | 'moderate' | 'severe' | null
}

export interface PdpMismatchCalculation {
	/** The absolute difference between PDP price and actual selling price */
	mismatchAmount: number | null
	/** The percentage difference between PDP price and actual selling price */
	mismatchPercent: number | null
	/** Severity level of the PDP mismatch - CRITICAL importance */
	severity: 'none' | 'minor' | 'moderate' | 'severe' | 'critical' | null
}

export interface MarketAnalysis {
	market: string
	price: number | null
	compareAtPrice: number | null
	discount: number | null
	warnings: MarketPriceWarning[]
	actualSellingPrice: number | null
	pdpPrice: number | null
	discountCalculation: DiscountCalculation
	pdpMismatch: PdpMismatchCalculation
}

export interface VariantAnalysisResult {
	url: string
	productId: string
	variantId: string
	basePrice: string
	baseCompareAtPrice: string | null
	marketAnalyses: MarketAnalysis[]
}

export class ProductPriceAnalysisService {
	/**
	 * Loads mock variant discount data from JSON file
	 * @param filename - Name of the JSON file (with or without path)
	 * @returns Parsed mock data export
	 */
	loadMockData(filename: string): MockDataExport {
		// If filename is just a name, look in data-analysis/product-prices/
		let filepath: string
		if (filename.includes('/')) {
			filepath = filename
		} else {
			filepath = join(process.cwd(), 'src', 'lib', 'data-analysis', 'product-prices', filename)
		}
		
		try {
			const fileContent = readFileSync(filepath, 'utf-8')
			return JSON.parse(fileContent) as MockDataExport
		} catch (error) {
			throw new Error(`Failed to load mock data from ${filepath}: ${error}`)
		}
	}

	/**
	 * Analyzes a single variant's pricing across all markets
	 * @param variant - Variant data with market-specific pricing
	 * @param markets - Array of market codes to analyze
	 * @returns Analysis results for the variant
	 */
	analyzeVariant(variant: VariantDiscountData, markets: string[]): VariantAnalysisResult {
		const marketAnalyses: MarketAnalysis[] = markets.map(market => 
			this.analyzeMarketPricing(variant, market)
		)
		
		return {
			url: variant.url,
			productId: variant.productId,
			variantId: variant.variantId,
			basePrice: variant.price,
			baseCompareAtPrice: variant.compareAtPrice,
			marketAnalyses
		}
	}

	/**
	 * Analyzes pricing for a specific market
	 * @param variant - Variant data
	 * @param market - Market code (e.g., 'US', 'LT')
	 * @returns Market-specific analysis
	 */
	private analyzeMarketPricing(variant: VariantDiscountData, market: string): MarketAnalysis {
		const price = this.parsePrice(variant[`${market}_price`])
		const compareAtPrice = this.parsePrice(variant[`${market}_compareAtPrice`])
		const discount = this.parseDiscount(variant[`${market}_discount`])
		
		const warnings: MarketPriceWarning[] = []
		
		// Check for conflict: both discount and compareAtPrice exist
		const hasConflict = this.hasConflict(compareAtPrice, discount)
		if (hasConflict) {
			warnings.push({
				type: 'compareAtAndDiscountConflict',
				message: `Market ${market} has both compareAtPrice (${compareAtPrice}) and discount (${discount})`
			})
		}
		
		// Calculate actual selling price
		const actualSellingPrice = this.calculateActualSellingPrice(price, discount)
		
		// Calculate PDP price
		const pdpPrice = this.calculatePdpPrice(price, compareAtPrice, discount)
		
		// Calculate discount percentages
		const discountCalculation = this.calculateDiscountPercentages(
			price,
			compareAtPrice,
			discount,
			actualSellingPrice
		)
		
		// Calculate PDP mismatch (CRITICAL)
		const pdpMismatch = this.calculatePdpMismatch(pdpPrice, actualSellingPrice)
		
		return {
			market,
			price,
			compareAtPrice,
			discount,
			warnings,
			actualSellingPrice,
			pdpPrice,
			discountCalculation,
			pdpMismatch
		}
	}

	/**
	 * Parses price value from various formats
	 * @param value - Price value (string, number, null, undefined)
	 * @returns Parsed number or null
	 */
	private parsePrice(value: string | number | null | undefined): number | null {
		if (value === null || value === undefined || value === '') {
			return null
		}
		
		const parsed = typeof value === 'string' ? parseFloat(value) : value
		return isNaN(parsed) ? null : parsed
	}

	/**
	 * Parses discount value, treating 0 and -1 as no discount
	 * @param value - Discount value
	 * @returns Parsed discount or null if no valid discount
	 */
	private parseDiscount(value: string | number | null | undefined): number | null {
		const parsed = this.parsePrice(value)
		
		// Discount of 0 or -1 means no discount
		if (parsed === null || parsed === 0 || parsed === -1) {
			return null
		}
		
		return parsed
	}

	/**
	 * Checks if there's a conflict (both compareAtPrice and discount exist)
	 * @param compareAtPrice - Compare at price value
	 * @param discount - Discount amount
	 * @returns True if conflict exists
	 */
	private hasConflict(compareAtPrice: number | null, discount: number | null): boolean {
		return compareAtPrice !== null && discount !== null
	}

	/**
	 * Calculates the actual selling price
	 * @param price - Listed price
	 * @param discount - Discount amount (null if no discount)
	 * @returns Actual selling price
	 */
	private calculateActualSellingPrice(price: number | null, discount: number | null): number | null {
		if (price === null) {
			return null
		}
		
		// If there's a valid discount, subtract it from price
		if (discount !== null) {
			return price - discount
		}
		
		// Otherwise, the actual price is just the listed price
		return price
	}

	/**
	 * Calculates the PDP (Product Detail Page) price
	 * Logic:
	 * - If compareAt exists (and is different from price), return price
	 * - If compareAt does not exist OR equals price, return price - discount
	 * @param price - Listed price
	 * @param compareAtPrice - Compare at price
	 * @param discount - Discount amount (null if no discount)
	 * @returns PDP price
	 */
	private calculatePdpPrice(
		price: number | null,
		compareAtPrice: number | null,
		discount: number | null
	): number | null {
		if (price === null) {
			return null
		}
		
		// If compareAt exists and is different from price, return price as-is
		if (compareAtPrice !== null && compareAtPrice !== price) {
			return price
		}
		
		// If compareAt doesn't exist or equals price, apply discount
		if (discount !== null) {
			return price - discount
		}
		
		// No compareAt and no discount, return price
		return price
	}

	/**
	 * Calculates discount percentages with conflict handling
	 * @param price - Listed price
	 * @param compareAtPrice - Compare at price
	 * @param discount - Discount amount
	 * @param actualSellingPrice - Calculated actual selling price
	 * @returns Discount calculation results
	 */
	private calculateDiscountPercentages(
		price: number | null,
		compareAtPrice: number | null,
		discount: number | null,
		actualSellingPrice: number | null
	): DiscountCalculation {
		let compareAtDiscountPercent: number | null = null
		let discountAmountPercent: number | null = null
		let mismatchPercent: number | null = null
		let mismatchSeverity: 'none' | 'minor' | 'moderate' | 'severe' | null = null
		
		// Calculate discount from compareAtPrice if available
		if (compareAtPrice !== null && price !== null) {
			// Lower number is the real price, higher is the compare-at
			const realPrice = Math.min(price, compareAtPrice)
			const higherPrice = Math.max(price, compareAtPrice)
			
			compareAtDiscountPercent = this.calculatePercentage(higherPrice - realPrice, higherPrice)
		}
		
		// Calculate discount from discount amount if available
		if (discount !== null && price !== null && actualSellingPrice !== null) {
			discountAmountPercent = this.calculatePercentage(discount, price)
		}
		
		// Calculate mismatch if both calculations exist (conflict scenario)
		if (compareAtDiscountPercent !== null && discountAmountPercent !== null) {
			mismatchPercent = Math.abs(compareAtDiscountPercent - discountAmountPercent)
			mismatchSeverity = this.determineMismatchSeverity(mismatchPercent)
		}
		
		return {
			compareAtDiscountPercent,
			discountAmountPercent,
			mismatchPercent,
			mismatchSeverity
		}
	}

	/**
	 * Calculates percentage: (amount / total) * 100
	 * @param amount - Amount value
	 * @param total - Total value
	 * @returns Percentage rounded to 2 decimal places
	 */
	private calculatePercentage(amount: number, total: number): number {
		if (total === 0) {
			return 0
		}
		
		return Math.round((amount / total) * 100 * 100) / 100
	}

	/**
	 * Determines the severity of discount mismatch
	 * @param mismatchPercent - Absolute difference between discount calculations
	 * @returns Severity level
	 */
	private determineMismatchSeverity(mismatchPercent: number): 'none' | 'minor' | 'moderate' | 'severe' {
		if (mismatchPercent === 0) {
			return 'none'
		}
		
		if (mismatchPercent < 5) {
			return 'minor'
		}
		
		if (mismatchPercent < 15) {
			return 'moderate'
		}
		
		return 'severe'
	}

	/**
	 * Calculates PDP price mismatch vs actual selling price
	 * This is CRITICAL: if PDP shows different price than what customer actually pays
	 * @param pdpPrice - Price displayed on Product Detail Page
	 * @param actualSellingPrice - Actual price customer pays
	 * @returns PDP mismatch calculation
	 */
	private calculatePdpMismatch(
		pdpPrice: number | null,
		actualSellingPrice: number | null
	): PdpMismatchCalculation {
		// If either price is null, no mismatch calculation possible
		if (pdpPrice === null || actualSellingPrice === null) {
			return {
				mismatchAmount: null,
				mismatchPercent: null,
				severity: null
			}
		}
		
		// Calculate absolute difference
		const mismatchAmount = Math.abs(pdpPrice - actualSellingPrice)
		
		// If prices match exactly, no mismatch
		if (mismatchAmount === 0) {
			return {
				mismatchAmount: 0,
				mismatchPercent: 0,
				severity: 'none'
			}
		}
		
		// Calculate percentage based on the higher price (more conservative)
		const basePrice = Math.max(pdpPrice, actualSellingPrice)
		const mismatchPercent = this.calculatePercentage(mismatchAmount, basePrice)
		
		// Determine severity - this is CRITICAL importance
		let severity: 'minor' | 'moderate' | 'severe' | 'critical'
		
		if (mismatchPercent < 1) {
			severity = 'minor' // Less than 1% difference - rounding issues
		} else if (mismatchPercent < 5) {
			severity = 'moderate' // 1-5% difference - noticeable but small
		} else if (mismatchPercent < 10) {
			severity = 'severe' // 5-10% difference - significant issue
		} else {
			severity = 'critical' // 10%+ difference - CRITICAL ISSUE
		}
		
		return {
			mismatchAmount,
			mismatchPercent,
			severity
		}
	}

	/**
	 * Analyzes all variants in mock data
	 * @param mockData - Loaded mock data export
	 * @returns Array of variant analysis results
	 */
	analyzeAllVariants(mockData: MockDataExport): VariantAnalysisResult[] {
		const markets = mockData.metadata.markets
		
		return mockData.variants.map(variant => 
			this.analyzeVariant(variant, markets)
		)
	}
}

