import { frontendLogger as logger } from '../../loggers/frontend-logger.js';

export interface PaymentOptionsInfo {
	hasPaymentOptions: boolean;
	optionCount: number;
}

/**
 * Manages payment option visibility based on available selling plans
 * Hides the parent container if only one selling plan option is available
 */
export class PaymentOptionManager {
    private readonly debug = false
	
	private readonly sellingPlanOptionsSelector = '.gPreorderSellingPlanOptions';
	private readonly sellingPlanParentSelector = '.gPreorderSellingPlanParent';
	private readonly observerContainerSelector = '.product__info-container';
	private observer: MutationObserver | null = null;
	private isInitialized = false;
	private observerInitialized = false;
	private onComplete?: () => void;

	/**
	 * Set completion callback for when payment option check is complete
	 */
	setCompletionCallback(callback: () => void): void {
		this.onComplete = callback;
		// If already initialized, call immediately
		if (this.isInitialized) {
			callback();
		}
	}

	/**
	 * Get information about available payment options
	 * Used by SkeletonManager to determine what skeletons to show
	 */
	getPaymentOptionsInfo(): PaymentOptionsInfo {
		const sellingPlanOptions = document.querySelector(this.sellingPlanOptionsSelector);
		
		if (!sellingPlanOptions) {
			return {
				hasPaymentOptions: false,
				optionCount: 0
			};
		}

		const optionCount = sellingPlanOptions.children.length;
		
		return {
			hasPaymentOptions: optionCount > 0,
			optionCount
		};
	}

	/**
	 * Initialize the payment option manager for observing and hiding behavior
	 * Sets up observer on product info container for dynamic content changes
	 * Should be called when preorder functionality is active
	 * Safe to call multiple times - will only initialize once
	 */
	init(): void {
		// Prevent double initialization
		if (this.observerInitialized) {
			if(this.debug) logger.debug('PaymentOptionManager already initialized, skipping');
			return;
		}
		
		this.observerInitialized = true;
		this.setupObserver();
		if(this.debug) logger.debug('PaymentOptionManager observer initialized');
		
		// Check immediately on init
		this.checkAndHideParent();
	}

	/**
	 * Initialize only the completion tracking without observer
	 * Used when we need payment options info but don't need hiding behavior
	 */
	initWithoutObserver(): void {
		// Signal completion immediately since we're not setting up observer
		if (!this.isInitialized) {
			this.isInitialized = true;
			this.onComplete?.();
		}
		if(this.debug) logger.debug('PaymentOptionManager initialized without observer');
	}

	/**
	 * Check if selling plan parent should be hidden based on child count
	 * Hides parent if only one child exists
	 */
	private checkAndHideParent(): void {
		const sellingPlanOptions = document.querySelector(this.sellingPlanOptionsSelector);

		if (!sellingPlanOptions) {
			return;
		}

		const children = sellingPlanOptions.children;

		// Hide parent if only one child exists - meaning theres no options, no noeed to show
		if (children.length === 1) {
			const parent = document.querySelector(this.sellingPlanParentSelector);
			if (parent) {
				if(this.debug) logger.debug('Only one selling plan option found, hiding parent');
				(parent as HTMLElement).style.display = 'none';
				
				// Stop observing after successful hide - no need to continue watching
				this.stopObserving();
				
			}
		}

        // Signal completion after hiding parent
        if (!this.isInitialized) {
            this.isInitialized = true;
            this.onComplete?.();
        }
	}

	/**
	 * Setup observer on product info container to handle dynamic content loading
	 * Reacts when selling plan options are added to the DOM
	 */
	private setupObserver(): void {
		const observerContainer = document.querySelector(this.observerContainerSelector);

		if (!observerContainer) {
			if(this.debug) logger.debug('Product info container not found', this.observerContainerSelector);
			// Signal completion even if container not found
			if (!this.isInitialized) {
				this.isInitialized = true;
				this.onComplete?.();
			}
			return;
		}

		this.observer = new MutationObserver(() => {
			this.checkAndHideParent();
		});

		this.observer.observe(observerContainer, {
			childList: true,
			subtree: true,
			attributes: true
		});

		if(this.debug) logger.debug('PaymentOptionManager observer started on', this.observerContainerSelector);
	}

	/**
	 * Stop observing for mutations
	 */
	private stopObserving(): void {
		if (this.observer) {
			this.observer.disconnect();
			this.observer = null;
			if(this.debug) logger.debug('PaymentOptionManager observer stopped');
		}
	}

	/**
	 * Clean up observer
	 */
	destroy(): void {
		this.stopObserving();
	}
}
