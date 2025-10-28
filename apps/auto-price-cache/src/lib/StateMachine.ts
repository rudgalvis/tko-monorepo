import type { ProcessState } from './types';
import { ProcessStatus } from './types';

/**
 * StateMachine handles state transitions and validations
 */
export class StateMachine {
	private state: ProcessState;

	constructor(initialState?: ProcessState) {
		this.state = initialState || this.createInitialState();
	}

	/**
	 * Create a fresh initial state
	 */
	private createInitialState(): ProcessState {
		return {
			status: ProcessStatus.IDLE,
			current_market: null,
			current_product_idx: 0,
			started_at: null,
			estimated_end_at: null,
			paused_at: null,
			completed_at: null,
			error_message: null,
			markets: [],
			total_markets: 0,
			current_market_index: 0,
			market_totals: {}
		};
	}

	/**
	 * Get current state
	 */
	getState(): ProcessState {
		return { ...this.state };
	}

	/**
	 * Check if a state transition is valid
	 */
	canTransition(from: ProcessStatus, to: ProcessStatus): boolean {
		const validTransitions: Record<ProcessStatus, ProcessStatus[]> = {
			[ProcessStatus.IDLE]: [ProcessStatus.INITIALIZING],
			[ProcessStatus.INITIALIZING]: [ProcessStatus.PROCESSING, ProcessStatus.ERROR],
			[ProcessStatus.PROCESSING]: [
				ProcessStatus.PROCESSING,
				ProcessStatus.COMPLETED,
				ProcessStatus.ERROR,
				ProcessStatus.PAUSED
			],
			[ProcessStatus.PAUSED]: [ProcessStatus.PROCESSING, ProcessStatus.ERROR],
			[ProcessStatus.COMPLETED]: [ProcessStatus.IDLE],
			[ProcessStatus.ERROR]: [ProcessStatus.IDLE, ProcessStatus.PROCESSING]
		};

		return validTransitions[from]?.includes(to) || false;
	}

	/**
	 * Transition to INITIALIZING state
	 */
	transitionToInitializing(markets: string[], marketTotals: Record<string, number>): ProcessState {
		if (!this.canTransition(this.state.status, ProcessStatus.INITIALIZING)) {
			throw new Error(
				`Cannot transition from ${this.state.status} to ${ProcessStatus.INITIALIZING}`
			);
		}

		this.state = {
			...this.state,
			status: ProcessStatus.INITIALIZING,
			markets,
			total_markets: markets.length,
			market_totals: marketTotals,
			started_at: new Date().toISOString(),
			current_market_index: 0,
			current_market: null,
			current_product_idx: 0
		};

		return this.getState();
	}

	/**
	 * Transition to PROCESSING state
	 */
	transitionToProcessing(marketId: string): ProcessState {
		if (!this.canTransition(this.state.status, ProcessStatus.PROCESSING)) {
			throw new Error(`Cannot transition from ${this.state.status} to ${ProcessStatus.PROCESSING}`);
		}

		this.state = {
			...this.state,
			status: ProcessStatus.PROCESSING,
			current_market: marketId,
			paused_at: null,
			error_message: null
		};

		return this.getState();
	}

	/**
	 * Update progress within PROCESSING state
	 */
	updateProgress(productIdx: number, estimatedEndAt: string | null = null): ProcessState {
		if (this.state.status !== ProcessStatus.PROCESSING) {
			throw new Error('Can only update progress while in PROCESSING state');
		}

		this.state = {
			...this.state,
			current_product_idx: productIdx,
			estimated_end_at: estimatedEndAt
		};

		return this.getState();
	}

	/**
	 * Move to next market
	 */
	nextMarket(): ProcessState {
		if (this.state.status !== ProcessStatus.PROCESSING) {
			throw new Error('Can only move to next market while in PROCESSING state');
		}

		const nextIndex = this.state.current_market_index + 1;

		if (nextIndex >= this.state.total_markets) {
			// No more markets, transition to COMPLETED
			return this.transitionToCompleted();
		}

		this.state = {
			...this.state,
			current_market_index: nextIndex,
			current_market: this.state.markets[nextIndex],
			current_product_idx: 0
		};

		return this.getState();
	}

	/**
	 * Transition to PAUSED state
	 */
	transitionToPaused(): ProcessState {
		if (!this.canTransition(this.state.status, ProcessStatus.PAUSED)) {
			throw new Error(`Cannot transition from ${this.state.status} to ${ProcessStatus.PAUSED}`);
		}

		this.state = {
			...this.state,
			status: ProcessStatus.PAUSED,
			paused_at: new Date().toISOString()
		};

		return this.getState();
	}

	/**
	 * Transition to COMPLETED state
	 */
	transitionToCompleted(): ProcessState {
		if (!this.canTransition(this.state.status, ProcessStatus.COMPLETED)) {
			throw new Error(`Cannot transition from ${this.state.status} to ${ProcessStatus.COMPLETED}`);
		}

		this.state = {
			...this.state,
			status: ProcessStatus.COMPLETED,
			completed_at: new Date().toISOString(),
			current_market: null
		};

		return this.getState();
	}

	/**
	 * Transition to ERROR state
	 */
	transitionToError(errorMessage: string): ProcessState {
		if (!this.canTransition(this.state.status, ProcessStatus.ERROR)) {
			throw new Error(`Cannot transition from ${this.state.status} to ${ProcessStatus.ERROR}`);
		}

		this.state = {
			...this.state,
			status: ProcessStatus.ERROR,
			error_message: errorMessage
		};

		return this.getState();
	}

	/**
	 * Reset to IDLE state
	 */
	reset(): ProcessState {
		this.state = this.createInitialState();
		return this.getState();
	}

	/**
	 * Check if process is locked (actively running)
	 */
	isLocked(): boolean {
		return (
			this.state.status === ProcessStatus.INITIALIZING ||
			this.state.status === ProcessStatus.PROCESSING
		);
	}

	/**
	 * Check if process can be resumed
	 */
	canResume(): boolean {
		return this.state.status === ProcessStatus.PAUSED || this.state.status === ProcessStatus.ERROR;
	}

	/**
	 * Load state from external source
	 */
	loadState(state: ProcessState): void {
		this.state = { ...state };
	}
}

