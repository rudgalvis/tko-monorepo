import { create, type FlatCache } from 'flat-cache';
import type { ProcessState, MarketProgress, Analytics } from './types';
import { ProcessStatus } from './types';

/**
 * StorageService manages persistence using flat-cache
 */
export class StorageService {
	private stateCache: FlatCache;
	private analyticsCache: FlatCache;
	private marketCaches: Map<string, FlatCache>;
	private cacheDir: string;

	constructor(cacheDir: string = '.cache') {
		this.cacheDir = cacheDir;
		this.stateCache = create({ cacheId: 'state', cacheDir });
		this.analyticsCache = create({ cacheId: 'analytics', cacheDir });
		this.marketCaches = new Map();
	}

	/**
	 * Get or create a market-specific cache
	 */
	private getMarketCache(marketId: string): FlatCache {
		if (!this.marketCaches.has(marketId)) {
			const cache = create({ cacheId: `market-${marketId}`, cacheDir: this.cacheDir });
			this.marketCaches.set(marketId, cache);
		}
		return this.marketCaches.get(marketId)!;
	}

	/**
	 * Save process state
	 */
	saveProcessState(state: ProcessState): void {
		this.stateCache.setKey('processState', state);
		this.stateCache.save(true);
	}

	/**
	 * Load process state
	 */
	loadProcessState(): ProcessState | null {
		return this.stateCache.getKey('processState') || null;
	}

	/**
	 * Check if a saved state exists
	 */
	hasProcessState(): boolean {
		return this.stateCache.getKey('processState') !== undefined;
	}

	/**
	 * Clear process state
	 */
	clearProcessState(): void {
		this.stateCache.removeKey('processState');
		this.stateCache.save(true);
	}

	/**
	 * Save market progress
	 */
	saveMarketProgress(marketId: string, progress: MarketProgress): void {
		const cache = this.getMarketCache(marketId);
		cache.setKey('progress', progress);
		cache.save(true);
	}

	/**
	 * Load market progress
	 */
	loadMarketProgress(marketId: string): MarketProgress | null {
		const cache = this.getMarketCache(marketId);
		return cache.getKey('progress') || null;
	}

	/**
	 * Clear market progress
	 */
	clearMarketProgress(marketId: string): void {
		const cache = this.getMarketCache(marketId);
		cache.removeKey('progress');
		cache.save(true);
	}

	/**
	 * Save analytics
	 */
	saveAnalytics(analytics: Analytics): void {
		this.analyticsCache.setKey('analytics', analytics);
		this.analyticsCache.save(true);
	}

	/**
	 * Load analytics
	 */
	loadAnalytics(): Analytics | null {
		return this.analyticsCache.getKey('analytics') || null;
	}

	/**
	 * Get or create initial analytics
	 */
	getOrCreateAnalytics(): Analytics {
		const existing = this.loadAnalytics();
		if (existing) return existing;

		const initial: Analytics = {
			total_requests: 0,
			total_success: 0,
			total_fails: 0,
			avg_time_per_request_ms: 0,
			success_rate: 0,
			markets: {}
		};

		this.saveAnalytics(initial);
		return initial;
	}

	/**
	 * Update analytics with new data
	 */
	updateAnalytics(marketId: string, progress: MarketProgress): void {
		const analytics = this.getOrCreateAnalytics();

		// Update totals
		analytics.total_requests = (analytics.total_requests || 0) + 1;

		// Update market-specific stats
		if (!analytics.markets[marketId]) {
			analytics.markets[marketId] = {
				completed: 0,
				successful: 0,
				failed: 0,
				success_rate: 0
			};
		}

		analytics.markets[marketId] = {
			completed: progress.completed,
			successful: progress.successful,
			failed: progress.failed,
			success_rate: progress.completed > 0 ? (progress.successful / progress.completed) * 100 : 0
		};

		// Recalculate overall stats
		let totalCompleted = 0;
		let totalSuccessful = 0;
		let totalFailed = 0;

		for (const market of Object.values(analytics.markets)) {
			totalCompleted += market.completed;
			totalSuccessful += market.successful;
			totalFailed += market.failed;
		}

		analytics.total_success = totalSuccessful;
		analytics.total_fails = totalFailed;
		analytics.success_rate = totalCompleted > 0 ? (totalSuccessful / totalCompleted) * 100 : 0;

		this.saveAnalytics(analytics);
	}

	/**
	 * Clear all caches
	 */
	clearAll(): void {
		this.stateCache.destroy();
		this.analyticsCache.destroy();

		for (const cache of this.marketCaches.values()) {
			cache.destroy();
		}

		this.marketCaches.clear();

		// Reload fresh caches
		this.stateCache = create({ cacheId: 'state', cacheDir: this.cacheDir });
		this.analyticsCache = create({ cacheId: 'analytics', cacheDir: this.cacheDir });
	}

	/**
	 * Check if process was interrupted (has PROCESSING state saved)
	 */
	wasInterrupted(): boolean {
		const state = this.loadProcessState();
		return (
			state !== null &&
			(state.status === ProcessStatus.PROCESSING || state.status === ProcessStatus.INITIALIZING)
		);
	}

	/**
	 * Get all market IDs that have saved progress
	 */
	getAllMarketIds(): string[] {
		const state = this.loadProcessState();
		return state?.markets || [];
	}
}

