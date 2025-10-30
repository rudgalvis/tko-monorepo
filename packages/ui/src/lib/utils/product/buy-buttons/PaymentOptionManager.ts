import { frontendLogger as logger } from '../../loggers/frontend-logger.js';
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

	/**
	 * Initialize the payment option manager
	 * Sets up observer on product info container for dynamic content changes
	 */
	init(): void {
		this.setupObserver();
		if(this.debug) logger.debug('PaymentOptionManager initialized');
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

		// Hide parent if only one child exists
		if (children.length === 1) {
			const parent = document.querySelector(this.sellingPlanParentSelector);
			if (parent) {
				if(this.debug) logger.debug('Only one selling plan option found, hiding parent');
				(parent as HTMLElement).style.display = 'none';
				
				// Stop observing after successful hide - no need to continue watching
				this.stopObserving();
			}
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
