import { create, type Cache } from 'flat-cache';

/**
 * ProcessControlService manages process control flags using flat-cache
 * This allows ALL process instances (including zombie processes from HMR) 
 * to coordinate through the filesystem
 */
export class ProcessControlService {
	private controlCache: Cache;
	private readonly STOP_FLAG_KEY = 'stop_requested';

	constructor(cacheDir: string = '.cache') {
		this.controlCache = create('process-control', cacheDir);
	}

	/**
	 * Request process to stop
	 * This creates a flag on disk that all running instances will check
	 */
	requestStop(): void {
		this.controlCache.setKey(this.STOP_FLAG_KEY, {
			requested_at: new Date().toISOString(),
			timestamp: Date.now()
		});
		this.controlCache.save(true);
		console.log('[ProcessControlService] Stop requested');
	}

	/**
	 * Clear the stop request flag
	 * Call this when starting or resuming a process
	 */
	clearStopRequest(): void {
		this.controlCache.setKey(this.STOP_FLAG_KEY, null);
		this.controlCache.save(true);
		console.log('[ProcessControlService] Stop request cleared');
	}

	/**
	 * Check if stop has been requested
	 * Returns true if any instance has requested a stop
	 * This is checked by ALL process instances including zombie processes
	 */
	isStopRequested(): boolean {
		const stopFlag = this.controlCache.getKey(this.STOP_FLAG_KEY);
		return stopFlag !== null && stopFlag !== undefined;
	}

	/**
	 * Get metadata about the stop request
	 */
	getStopRequestMetadata(): { requested_at: string; timestamp: number } | null {
		const stopFlag = this.controlCache.getKey(this.STOP_FLAG_KEY);
		if (!stopFlag) {
			return null;
		}
		return stopFlag;
	}

	/**
	 * Destroy the cache
	 */
	destroy(): void {
		this.controlCache.destroy();
	}
}

