import { StateMachine } from './StateMachine';
import { MarketProcessor } from './MarketProcessor';
import { StorageService } from './StorageService';
import type { StatusResponse, Variant, Market, PriceFetchResult } from './types';

/**
 * CacheService is the main orchestrator for the price caching system
 */
export class CacheService {
	private stateMachine: StateMachine;
	private storage: StorageService;
	private currentProcessor: MarketProcessor | null = null;
	private isRunning: boolean = false;
	private shouldStop: boolean = false;

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
		this.stateMachine = new StateMachine();
		this.getAvailableMarkets = options.getAvailableMarkets;
		this.getProductsForMarket = options.getProductsForMarket;
		this.fetchPrice = options.fetchPrice;

		// Check for interrupted process on initialization
		this.checkForInterruption();
	}

	/**
	 * Check if there was an interrupted process and handle it
	 */
	private checkForInterruption(): void {
		if (this.storage.wasInterrupted()) {
			const savedState = this.storage.loadProcessState();
			if (savedState) {
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

		// Check if we can resume
		if (this.stateMachine.canResume()) {
			return this.resume();
		}

		try {
			this.isRunning = true;
			this.shouldStop = false;

			// Get available markets
			const markets = await this.getAvailableMarkets();
			const marketIds = markets.map((m) => m.id);

			// Transition to INITIALIZING
			this.stateMachine.transitionToInitializing(marketIds);
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
			this.shouldStop = false;

			const state = this.stateMachine.getState();

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
			if (this.shouldStop) {
				this.stateMachine.transitionToPaused();
				this.storage.saveProcessState(this.stateMachine.getState());
				return;
			}

			const marketId = state.markets[i];
			await this.processMarket(marketId);
		}

		// All markets processed
		this.stateMachine.transitionToCompleted();
		this.storage.saveProcessState(this.stateMachine.getState());
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
			if (this.shouldStop) {
				this.stateMachine.transitionToPaused();
				this.storage.saveProcessState(this.stateMachine.getState());
				return;
			}

			const product = products[i];

			// Update state machine progress
			this.stateMachine.updateProgress(i);
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
	 */
	stop(): void {
		this.shouldStop = true;
	}

	/**
	 * Get current status
	 */
	getStatus(): StatusResponse {
		const state = this.stateMachine.getState();
		const analytics = this.storage.getOrCreateAnalytics();

		// Build market status
		const markets: StatusResponse['markets'] = {};

		for (const marketId of state.markets) {
			const progress = this.storage.loadMarketProgress(marketId);

			if (progress) {
				markets[marketId] = {
					completed: progress.completed,
					total: progress.total_products,
					success_rate: progress.completed > 0 ? (progress.successful / progress.completed) * 100 : 0,
					failed: progress.failed,
					eta_minutes: progress.eta_minutes
				};
			} else {
				markets[marketId] = {
					completed: 0,
					total: 0,
					success_rate: 0,
					failed: 0,
					eta_minutes: null
				};
			}
		}

		// Calculate overall progress
		let totalProducts = 0;
		let totalCompleted = 0;
		let totalEtaMinutes = 0;

		for (const market of Object.values(markets)) {
			totalProducts += market.total;
			totalCompleted += market.completed;
			if (market.eta_minutes !== null) {
				totalEtaMinutes += market.eta_minutes;
			}
		}

		const overallProgress = totalProducts > 0 ? (totalCompleted / totalProducts) * 100 : 0;

		return {
			current_state: state,
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
}

