import { frontendLogger as logger } from '../../loggers/frontend-logger.js';

/**
 * Global state for tracking Globo preorder status
 */
interface PreorderState {
	isPreorderProduct: boolean;
}

// Global state stored on window
declare global {
	interface Window {
		__GLOBO_PREORDER_STATE__?: PreorderState;
	}
}

/**
 * Manages Globo preorder state and event detection
 * Provides global state tracking for preorder functionality
 * Uses singleton pattern with static methods for state access
 */
export class PreorderStateManager {
	private static instance: PreorderStateManager | null = null;
	private readonly debug = false;
	private isListenerInitialized = false;
	private onComplete?: () => void;

	private constructor() {}

	/**
	 * Get singleton instance
	 */
	static getInstance(): PreorderStateManager {
		if (!PreorderStateManager.instance) {
			PreorderStateManager.instance = new PreorderStateManager();
		}
		return PreorderStateManager.instance;
	}

	/**
	 * Get the current preorder state (static accessor)
	 */
	private static getPreorderState(): PreorderState {
		if (!window.__GLOBO_PREORDER_STATE__) {
			window.__GLOBO_PREORDER_STATE__ = {
				isPreorderProduct: false
			};
		}
		return window.__GLOBO_PREORDER_STATE__;
	}

	/**
	 * Set preorder product status (static mutator)
	 */
	private static setIsPreorderProduct(value: boolean): void {
		const state = PreorderStateManager.getPreorderState();
		state.isPreorderProduct = value;
		if (PreorderStateManager.getInstance().debug) {
			logger.debug('Preorder state updated:', { isPreorderProduct: value });
		}
	}

	/**
	 * Check if current product is a preorder product
	 * Can be called statically without instantiation
	 */
	static isPreorderProduct(): boolean {
		return PreorderStateManager.getPreorderState().isPreorderProduct;
	}

	/**
	 * Set completion callback for when preorder listener is initialized
	 */
	setCompletionCallback(callback: () => void): void {
		this.onComplete = callback;
		// If already initialized, call immediately
		if (this.isListenerInitialized) {
			callback();
		}
	}

	/**
	 * Initialize preorder event listener
	 * Should be called early in page lifecycle (e.g., in main-head.ts)
	 * Sets global state when Globo preorder functionality is detected
	 * Safe to call multiple times - will only initialize once
	 */
	init(): void {
		// Prevent double initialization
		if (this.isListenerInitialized) {
			if (this.debug) logger.debug('PreorderStateManager already initialized, skipping');
			return;
		}

		this.isListenerInitialized = true;

		document.addEventListener('globo.preorder.show.preorder', () => {
			if (this.debug) logger.debug('Globo preorder event detected');
			PreorderStateManager.setIsPreorderProduct(true);
		});

		if (this.debug) logger.debug('Preorder event listener initialized');

		// Signal completion
		this.onComplete?.();
	}

	/**
	 * Clean up resources
	 */
	destroy(): void {
		// Note: Event listeners are not cleaned up as this manager
		// is typically long-lived for the page lifetime
	}
}

