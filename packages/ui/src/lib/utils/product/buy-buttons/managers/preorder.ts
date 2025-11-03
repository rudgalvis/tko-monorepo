import { BUY_BUTTONS_CONFIG } from '../config.js';
import { frontendLogger as logger } from '../../../../loggers/frontend-logger.js';

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
 * Get the current preorder state
 */
function getPreorderState(): PreorderState {
	if (!window.__GLOBO_PREORDER_STATE__) {
		window.__GLOBO_PREORDER_STATE__ = {
			isPreorderProduct: false
		};
	}
	return window.__GLOBO_PREORDER_STATE__;
}

/**
 * Set preorder product status
 */
export function setIsPreorder(value: boolean): void {
	const state = getPreorderState();
	state.isPreorderProduct = value;
	if (BUY_BUTTONS_CONFIG.debug.enabled) {
		logger.debug('Preorder state updated:', { isPreorderProduct: value });
	}
}

/**
 * Check if current product is a preorder product
 */
export function isPreorderProduct(): boolean {
	return getPreorderState().isPreorderProduct;
}

/**
 * Initialize preorder event listener
 * Should be called early in page lifecycle (e.g., in main-head.ts)
 * Sets global state when Globo preorder functionality is detected
 * Safe to call multiple times - will only initialize once
 */
let isListenerInitialized = false;

export function initPreorderListener(): void {
	// Prevent double initialization
	if (isListenerInitialized) {
		if (BUY_BUTTONS_CONFIG.debug.enabled) {
			logger.debug('Preorder listener already initialized, skipping');
		}
		return;
	}

	isListenerInitialized = true;

	document.addEventListener('globo.preorder.show.preorder', () => {
		if (BUY_BUTTONS_CONFIG.debug.enabled) {
			logger.debug('Globo preorder event detected');
		}
		setIsPreorder(true);
	});

	if (BUY_BUTTONS_CONFIG.debug.enabled) {
		logger.debug('Preorder event listener initialized');
	}
}


