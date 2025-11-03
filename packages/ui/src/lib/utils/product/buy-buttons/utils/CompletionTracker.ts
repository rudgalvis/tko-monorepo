import { frontendLogger as logger } from '../../../loggers/frontend-logger.js';
import type { CompletionCallback } from '../types.js';

/**
 * Tracks completion status of multiple managers
 * Provides centralized completion tracking with polling and callbacks
 */
export class CompletionTracker {
	private readonly debug: boolean;
	private completionTracking = new Map<string, boolean>();
	private completionPollInterval: ReturnType<typeof setInterval> | null = null;
	private onAllComplete?: CompletionCallback;

	constructor(debug = false) {
		this.debug = debug;
	}

	/**
	 * Register a manager that needs to complete
	 */
	register(managerName: string): void {
		this.completionTracking.set(managerName, false);
		if (this.debug) {
			logger.debug(`📝 Registered manager: ${managerName}`);
		}
	}

	/**
	 * Mark a manager as complete
	 */
	markComplete(managerName: string): void {
		if (this.debug) {
			logger.debug(`✅ Manager completed: ${managerName}`);
		}
		this.completionTracking.set(managerName, true);
		this.logCompletionStatus();
		this.checkAllComplete();
	}

	/**
	 * Set callback to be called when all managers are complete
	 */
	onComplete(callback: CompletionCallback): void {
		this.onAllComplete = callback;
	}

	/**
	 * Start polling to track pending completions
	 */
	startPolling(intervalMs = 5000): void {
		if (this.completionPollInterval) return;

		this.completionPollInterval = setInterval(() => {
			const pendingManagers = Array.from(this.completionTracking.entries())
				.filter(([, complete]) => !complete)
				.map(([name]) => name);

			if (pendingManagers.length > 0) {
				if (this.debug) {
					logger.warn(
						`⏳ Still waiting for completion of: ${pendingManagers.join(', ')}`
					);
				}
			}
		}, intervalMs);
	}

	/**
	 * Stop polling for completions
	 */
	stopPolling(): void {
		if (this.completionPollInterval) {
			clearInterval(this.completionPollInterval);
			this.completionPollInterval = null;
		}
	}

	/**
	 * Check if all registered managers are complete
	 */
	private checkAllComplete(): void {
		const expectedManagers = Array.from(this.completionTracking.keys());
		const allComplete = expectedManagers.every(
			(manager) => this.completionTracking.get(manager) === true
		);

		if (allComplete && expectedManagers.length > 0) {
			if (this.debug) {
				logger.debug('✅ All managers initialized successfully', {
					managers: expectedManagers,
				});
			}
			this.stopPolling();
			this.onAllComplete?.();
		}
	}

	/**
	 * Log current completion status for debugging
	 */
	private logCompletionStatus(): void {
		if (this.debug) {
			const status = Array.from(this.completionTracking.entries()).map(
				([manager, complete]) => ({
					manager,
					complete,
					status: complete ? '✅ DONE' : '⏳ WAITING'
				})
			);
			logger.debug('📊 Completion Status:', status);
		}
	}

	/**
	 * Clean up resources
	 */
	destroy(): void {
		this.stopPolling();
		this.completionTracking.clear();
	}
}


