import { StateMachine } from './StateMachine';
import { MarketProcessor } from './MarketProcessor';
import { StorageService } from './StorageService';
import { FetchLogService } from './FetchLogService';
import { ProcessControlService } from './ProcessControlService';
import type { StatusResponse, Variant, Market, PriceFetchResult } from './types';

/**
 * CacheService is the main orchestrator for the price caching system
 */
export class CacheService {
	private stateMachine: StateMachine;
	private storage: StorageService;
	private fetchLogService: FetchLogService;
	private processControl: ProcessControlService;
	private currentProcessor: MarketProcessor | null = null;
	private isRunning: boolean = false;

	// Data providers
	private getAvailableMarkets: () => Promise<Market[]>;
	private getProductsForMarket: (marketId: string) => Promise<Variant[]>;
	private fetchPrice: (productId: string, marketId: string) => Promise<PriceFetchResult>;

	constructor(
		options: {
			getAvailableMarkets: () => Promise<Market[]>;
			getProductsForMarket: (marketId: string) => Promise<Variant[]>;
			fetchPrice: (productId: string, marketId: string) => Promise<PriceFetchResult>;
		},
		cacheDir: string = '.cache'
	) {
		this.storage = new StorageService(cacheDir);
		this.fetchLogService = new FetchLogService(cacheDir);
		this.processControl = new ProcessControlService(cacheDir);
		this.stateMachine = new StateMachine();
		this.getAvailableMarkets = options.getAvailableMarkets;
		this.getProductsForMarket = options.getProductsForMarket;
		this.fetchPrice = options.fetchPrice; 

		// Check for interrupted process on initialization 
		this.checkForInterruption();
		
		// Note: We don't automatically clear stop requests here anymore
		// This prevents race conditions with zombie processes during HMR/page reloads
		// The stop flag will be cleared explicitly when start() or resume() is called
	}
 
	/**
	 * Check if there was an interrupted process and handle it
	 */
	private checkForInterruption(): void { 
		if (this.storage.wasInterrupted()) {
			const savedState = this.storage.loadProcessState();
			if (savedState) {
				// Backward compatibility: ensure market_totals exists
				if (!savedState.market_totals) {
					savedState.market_totals = {};
					// Reconstruct market_totals from saved market progress
					for (const marketId of savedState.markets) {
						const progress = this.storage.loadMarketProgress(marketId);
						if (progress) {
							savedState.market_totals[marketId] = progress.total_products;
						}
					}
				}
				this.stateMachine.loadState(savedState);
				this.stateMachine.transitionToPaused();
				this.storage.saveProcessState(this.stateMachine.getState());
			}
		}
	}


	/**
	 * Start the caching process
	 */
	async start(): Promise<void> {
		// Check lock
		if (this.stateMachine.isLocked()) {
			throw new Error('Process is already running');
		}

		// Automatically reset if completed
		const currentState = this.stateMachine.getState();
		if (currentState.status === 'COMPLETED') {
			console.log('[CacheService] Task is completed, automatically resetting before starting fresh');
			this.reset();
		}

		// Check if we can resume
		if (this.stateMachine.canResume()) {
			return this.resume();
		}

		try {
			this.isRunning = true;
			// Clear any stop request to allow process to run
			this.processControl.clearStopRequest();

			// Get available markets
			const markets = await this.getAvailableMarkets();
			const marketIds = markets.map((m) => m.id);

			// Pre-fetch total products for all markets to calculate overall progress correctly
			console.log('Fetching total products for all markets...');
			const marketTotals: Record<string, number> = {};
			for (const marketId of marketIds) {
				const products = await this.getProductsForMarket(marketId);
				marketTotals[marketId] = products.length;
				console.log(`Market ${marketId}: ${products.length} products`);
			}

			// Transition to INITIALIZING
			this.stateMachine.transitionToInitializing(marketIds, marketTotals);
			this.storage.saveProcessState(this.stateMachine.getState());

			// Start processing
			await this.processAllMarkets();
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Unknown error';
			this.stateMachine.transitionToError(errorMessage);
			this.storage.saveProcessState(this.stateMachine.getState());
			throw error;
		} finally {
			this.isRunning = false;
		}
	}

	/**
	 * Resume a paused or errored process
	 */
	async resume(): Promise<void> {
		if (!this.stateMachine.canResume()) {
			throw new Error('Cannot resume process in current state');
		}

		try {
			this.isRunning = true;
			// Clear any stop request to allow process to resume
			this.processControl.clearStopRequest();

			const state = this.stateMachine.getState();

			// Ensure market_totals is populated for any markets that haven't been fetched yet
			console.log('Checking market totals...');
			for (const marketId of state.markets) {
				if (!state.market_totals[marketId]) {
					console.log(`Fetching total products for market ${marketId}...`);
					const products = await this.getProductsForMarket(marketId);
					state.market_totals[marketId] = products.length;
				}
			}

			// Resume from current market
			if (state.current_market) {
				this.stateMachine.transitionToProcessing(state.current_market);
			} else if (state.markets.length > 0) {
				this.stateMachine.transitionToProcessing(state.markets[state.current_market_index]);
			}

			this.storage.saveProcessState(this.stateMachine.getState());

			await this.processAllMarkets();
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Unknown error';
			this.stateMachine.transitionToError(errorMessage);
			this.storage.saveProcessState(this.stateMachine.getState());
			throw error;
		} finally {
			this.isRunning = false;
		}
	}

	/**
	 * Process all markets sequentially
	 */
	private async processAllMarkets(): Promise<void> {
		const state = this.stateMachine.getState();

		for (let i = state.current_market_index; i < state.markets.length; i++) {
			// Check filesystem stop flag (works across all process instances including HMR zombies)
			if (this.processControl.isStopRequested()) {
				console.log('[CacheService] Stop request detected, pausing process');
				// Only transition to paused if not already paused
				const currentState = this.stateMachine.getState();
				if (currentState.status !== 'PAUSED') {
					this.stateMachine.transitionToPaused();
					this.storage.saveProcessState(this.stateMachine.getState());
				}
				return;
			}

			const marketId = state.markets[i];
			await this.processMarket(marketId);
		}

		// All markets processed
		this.stateMachine.transitionToCompleted();
		this.storage.saveProcessState(this.stateMachine.getState());
		
		// Clear fetch logs on successful completion
		this.fetchLogService.clearLogs();
		console.log('[CacheService] Fetch logs cleared after successful completion');
	}

	/**
	 * Process a single market
	 */
	private async processMarket(marketId: string): Promise<void> {
		// Transition to processing this market
		this.stateMachine.transitionToProcessing(marketId);
		this.storage.saveProcessState(this.stateMachine.getState());

		// Get products for this market
		const products = await this.getProductsForMarket(marketId);

		// Load existing progress if any
		const existingProgress = this.storage.loadMarketProgress(marketId);

		// Create market processor
		this.currentProcessor = new MarketProcessor(
			marketId,
			products.length,
			existingProgress || undefined,
			(progress) => {
				// Save progress on each update
				this.storage.saveMarketProgress(marketId, progress);
				this.storage.updateAnalytics(marketId, progress);
			}
		);

		// Process products sequentially
		const startIdx = this.currentProcessor.getNextProductIndex();

		for (let i = startIdx; i < products.length; i++) {
			// Check filesystem stop flag before each product
			if (this.processControl.isStopRequested()) {
				console.log('[CacheService] Stop request detected during product processing, pausing');
				// Only transition to paused if not already paused
				const currentState = this.stateMachine.getState();
				if (currentState.status !== 'PAUSED') {
					this.stateMachine.transitionToPaused();
					this.storage.saveProcessState(this.stateMachine.getState());
				}
				return;
			}

			const product = products[i];

			// Update state machine progress (estimated_end_at is calculated in getStatus())
			this.stateMachine.updateProgress(i, null);
			this.storage.saveProcessState(this.stateMachine.getState());

			// Process the product
			await this.currentProcessor.processProduct(product, this.fetchPrice);

			// Check success rate
			if (!this.currentProcessor.hasAcceptableSuccessRate()) {
				console.warn(
					`Low success rate for market ${marketId}: ${this.currentProcessor.getSuccessRate()}%`
				);
			}
		}

		// Mark market as completed
		this.currentProcessor.markCompleted();
		this.storage.saveMarketProgress(marketId, this.currentProcessor.getProgress());

		// Move to next market
		this.stateMachine.nextMarket();
		this.storage.saveProcessState(this.stateMachine.getState());

		this.currentProcessor = null;
	}

	/**
	 * Stop the caching process
	 * Creates a filesystem flag that ALL process instances will check
	 * This works across HMR reloads and will stop zombie processes
	 */
	stop(): void {
		console.log('[CacheService] Stop requested');
		this.processControl.requestStop();
	}

	/**
	 * Get current status
	 */
	getStatus(): StatusResponse {
		const state = this.stateMachine.getState();
		const analytics = this.storage.getOrCreateAnalytics();

		// Calculate average time per request first (for estimating ETA of unstarted markets)
		let avgTimePerRequestMs = 0;
		let totalRequestsForAvg = 0;

		for (const marketId of state.markets) {
			const progress = this.storage.loadMarketProgress(marketId);
			if (progress && progress.completed > 0 && progress.avg_time_per_request_ms > 0) {
				avgTimePerRequestMs += progress.avg_time_per_request_ms * progress.completed;
				totalRequestsForAvg += progress.completed;
			}
		}

		if (totalRequestsForAvg > 0) {
			avgTimePerRequestMs = avgTimePerRequestMs / totalRequestsForAvg;
		}

		// Build market status
		const markets: StatusResponse['markets'] = {};

		for (const marketId of state.markets) {
			const progress = this.storage.loadMarketProgress(marketId);
			// Use pre-fetched total from state, fallback to progress.total_products if available
			const total = state.market_totals[marketId] || progress?.total_products || 0;

			if (progress) {
				markets[marketId] = {
					completed: progress.completed,
					total: total,
					success_rate: progress.completed > 0 ? (progress.successful / progress.completed) * 100 : 0,
					failed: progress.failed,
					eta_minutes: progress.eta_minutes
				};
			} else {
				// Market hasn't started yet - estimate ETA based on average time
				let estimatedEta: number | null = null;
				if (avgTimePerRequestMs > 0 && total > 0) {
					const estimatedTimeMs = total * avgTimePerRequestMs;
					estimatedEta = Math.ceil(estimatedTimeMs / 60000);
				}

				markets[marketId] = {
					completed: 0,
					total: total,
					success_rate: 0,
					failed: 0,
					eta_minutes: estimatedEta
				};
			}
		}

		// Calculate overall progress and total ETA using all market data
		let totalProducts = 0;
		let totalCompleted = 0;
		let totalEtaMinutes = 0;

		// Calculate total products and completed
		for (const marketId of state.markets) {
			// Use pre-fetched totals to ensure all markets are counted from the start
			totalProducts += state.market_totals[marketId] || 0;
			
			const progress = this.storage.loadMarketProgress(marketId);
			if (progress) {
				totalCompleted += progress.completed;
			}
		}

		// Calculate total ETA including estimates for markets that haven't started
		for (const marketId of state.markets) {
			const progress = this.storage.loadMarketProgress(marketId);
			const totalForMarket = state.market_totals[marketId] || 0;
			
			if (progress) {
				// Market has started - use its ETA
				if (progress.eta_minutes !== null && progress.eta_minutes > 0) {
					totalEtaMinutes += progress.eta_minutes;
				}
			} else if (avgTimePerRequestMs > 0 && totalForMarket > 0) {
				// Market hasn't started yet - estimate ETA based on average time
				const estimatedTimeMs = totalForMarket * avgTimePerRequestMs;
				const estimatedMinutes = Math.ceil(estimatedTimeMs / 60000);
				totalEtaMinutes += estimatedMinutes;
			}
		}

		const overallProgress = totalProducts > 0 ? (totalCompleted / totalProducts) * 100 : 0;

		// Update analytics with the freshly calculated average time
		// Only update if we have actual data, otherwise keep the stored value
		if (avgTimePerRequestMs > 0) {
			analytics.avg_time_per_request_ms = avgTimePerRequestMs;
		}
		
		// Calculate overall estimated end time if processing
		let currentStateWithEta = state;
		if (state.status === 'PROCESSING' && totalEtaMinutes > 0) {
			const now = new Date();
			const etaMs = totalEtaMinutes * 60 * 1000;
			const endTime = new Date(now.getTime() + etaMs);
			currentStateWithEta = {
				...state,
				estimated_end_at: endTime.toISOString()
			};
		}

		return {
			current_state: currentStateWithEta,
			markets,
			overall_progress: overallProgress,
			total_eta_minutes: totalEtaMinutes > 0 ? totalEtaMinutes : null,
			analytics
		};
	}

	/**
	 * Reset the entire process
	 */
	reset(): void {
		if (this.isRunning) {
			throw new Error('Cannot reset while process is running');
		}

		this.stateMachine.reset();
		this.storage.clearAll();
		this.currentProcessor = null;
		
		// Clear filesystem locks
		this.processControl.clearStopRequest();
		console.log('[CacheService] Process control locks cleared on reset');
		
		// Clear fetch logs on reset
		this.fetchLogService.clearLogs();
		console.log('[CacheService] Fetch logs cleared on reset');
	}

	/**
	 * Check if process is running
	 */
	isProcessRunning(): boolean {
		return this.isRunning;
	}

	/**
	 * Get current state
	 */
	getCurrentState() {
		return this.stateMachine.getState();
	}

	/**
	 * Get the fetch log service
	 */
	getFetchLogService(): FetchLogService {
		return this.fetchLogService;
	}
}

