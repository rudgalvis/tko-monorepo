import type { MarketProgress, PriceFetchResult, Variant } from './types';
import { logFailedItem, logMarketSummary } from './logger';

/**
 * MarketProcessor handles sequential processing of products for a single market
 */
export class MarketProcessor {
	private progress: MarketProgress;
	private onProgress?: (progress: MarketProgress) => void;

	constructor(
		marketId: string,
		totalProducts: number,
		existingProgress?: MarketProgress,
		onProgress?: (progress: MarketProgress) => void
	) {
		this.onProgress = onProgress;
		this.progress = existingProgress || this.createInitialProgress(marketId, totalProducts);
	}

	/**
	 * Create initial progress state for a market
	 */
	private createInitialProgress(marketId: string, totalProducts: number): MarketProgress {
		return {
			market_id: marketId,
			total_products: totalProducts,
			completed: 0,
			successful: 0,
			failed: 0,
			eta_minutes: null,
			started_at: new Date().toISOString(),
			completed_at: null,
			errors: [],
			avg_time_per_request_ms: 0
		};
	}

	/**
	 * Get current progress
	 */
	getProgress(): MarketProgress {
		return { ...this.progress };
	}

	/**
	 * Process a single product price fetch
	 */
	async processProduct(
		product: Variant,
		fetchPriceFunc: (productId: string, marketId: string) => Promise<PriceFetchResult>
	): Promise<PriceFetchResult> {
		const startTime = Date.now();
		const productId = String(product.id);

		try {
			const result = await fetchPriceFunc(productId, this.progress.market_id);
			const duration = Date.now() - startTime;

			this.recordResult(result, duration);

			return result;
		} catch (error) {
			const duration = Date.now() - startTime;
			const errorMessage = error instanceof Error ? error.message : 'Unknown error';

			const result: PriceFetchResult = {
				product_id: productId,
				market_id: this.progress.market_id,
				success: false,
				duration_ms: duration,
				error: errorMessage
			};

			this.recordResult(result, duration);

			return result;
		}
	}

	/**
	 * Record the result of a price fetch
	 */
	private recordResult(result: PriceFetchResult, durationMs: number): void {
		this.progress.completed++;

		if (result.success) {
			this.progress.successful++;
		} else {
			this.progress.failed++;
			const errorRecord = {
				product_id: result.product_id,
				error_message: result.error || 'Unknown error',
				timestamp: new Date().toISOString(),
				retry_count: 0
			};
			this.progress.errors.push(errorRecord);

			// Log the failed item to file
			logFailedItem({
				...errorRecord,
				market_id: this.progress.market_id,
				duration_ms: durationMs
			});
		}

		// Update average time per request
		const totalTime =
			this.progress.avg_time_per_request_ms * (this.progress.completed - 1) + durationMs;
		this.progress.avg_time_per_request_ms = totalTime / this.progress.completed;
		
		console.log(`[MarketProcessor] ${this.progress.market_id}: completed=${this.progress.completed}, avg_time=${this.progress.avg_time_per_request_ms}ms, latest_duration=${durationMs}ms`);

		// Update ETA
		this.updateETA();

		// Notify progress
		if (this.onProgress) {
			this.onProgress(this.getProgress());
		}
	}

	/**
	 * Update ETA based on current progress and average time
	 */
	private updateETA(): void {
		if (this.progress.completed === 0) {
			this.progress.eta_minutes = null;
			return;
		}

		const remaining = this.progress.total_products - this.progress.completed;
		const avgTimePerRequestMs = this.progress.avg_time_per_request_ms;

		if (avgTimePerRequestMs === 0) {
			this.progress.eta_minutes = null;
			return;
		}

		const remainingTimeMs = remaining * avgTimePerRequestMs;
		this.progress.eta_minutes = Math.ceil(remainingTimeMs / 60000); // Convert to minutes
	}

	/**
	 * Check if market processing is complete
	 */
	isComplete(): boolean {
		return this.progress.completed >= this.progress.total_products;
	}

	/**
	 * Mark market as completed
	 */
	markCompleted(): MarketProgress {
		this.progress.completed_at = new Date().toISOString();
		this.progress.eta_minutes = 0;

		// Log market summary with failures if any
		if (this.progress.failed > 0) {
			logMarketSummary({
				market_id: this.progress.market_id,
				total_products: this.progress.total_products,
				completed: this.progress.completed,
				successful: this.progress.successful,
				failed: this.progress.failed,
				success_rate: this.getSuccessRate(),
				failed_items: this.progress.errors
			});
		}

		return this.getProgress();
	}

	/**
	 * Get success rate as a percentage
	 */
	getSuccessRate(): number {
		if (this.progress.completed === 0) return 0;
		return (this.progress.successful / this.progress.completed) * 100;
	}

	/**
	 * Calculate overall ETA for remaining products
	 */
	calculateETA(): number | null {
		return this.progress.eta_minutes;
	}

	/**
	 * Get the index of the next product to process
	 */
	getNextProductIndex(): number {
		return this.progress.completed;
	}

	/**
	 * Check if success rate is acceptable (for monitoring)
	 */
	hasAcceptableSuccessRate(threshold: number = 80): boolean {
		if (this.progress.completed < 10) {
			// Need at least 10 requests to judge
			return true;
		}

		return this.getSuccessRate() >= threshold;
	}

	/**
	 * Load progress from external source
	 */
	loadProgress(progress: MarketProgress): void {
		this.progress = { ...progress };
	}
}

