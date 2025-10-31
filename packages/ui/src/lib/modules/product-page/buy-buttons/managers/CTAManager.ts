import { BUY_BUTTONS_CONFIG } from '../config.js';
import type { CompletionCallback } from '../types.js';

/**
 * Manages CTA button text updates based on price and product state (regular vs preorder)
 */
export class CTAManager {
	private readonly debug: boolean;
	private isPriceReady = false;
	private isPreorder = false;
	private price: string | undefined;
	private isInitialized = false;
	private onComplete?: CompletionCallback;
	private initializationTimeout: ReturnType<typeof setTimeout> | null = null;
	private readonly INITIALIZATION_TIMEOUT_MS = 3000; // Fallback timeout

	constructor() {
		this.debug = BUY_BUTTONS_CONFIG.debug.enabled;
	}

	/**
	 * Set completion callback for when CTA updates are complete
	 */
	setCompletionCallback(callback: CompletionCallback): void {
		this.onComplete = callback;
		// If already initialized, call immediately
		if (this.isInitialized) {
			callback();
		} else {
			// Set a timeout to force completion if price never arrives
			this.initializationTimeout = setTimeout(() => {
				if (!this.isInitialized) {
					console.warn('⚠️ CTAManager: Forcing completion after timeout (price may not have been set)');
					this.forceComplete();
				}
			}, this.INITIALIZATION_TIMEOUT_MS);
		}
	}

	/**
	 * Set the price and trigger update
	 */
	setPrice(price: string): void {
		this.price = price;
		this.isPriceReady = true;
		this.update();
	}

	/**
	 * Set preorder state and trigger update
	 */
	setIsPreorder(isPreorder: boolean): void {
		this.isPreorder = isPreorder;
		this.update();
	}

	/**
	 * Add price to regular buy button
	 */
	private addPriceToBuyButton(): void {
		const targetEls = document.querySelectorAll<HTMLElement>(
			BUY_BUTTONS_CONFIG.selectors.ctaPrice
		);
		targetEls.forEach((el) => {
			el.innerHTML = ` for ${this.price}`;
		});
	}

	/**
	 * Add price to preorder button (handles Globo integration)
	 */
	private addPriceToPreorderButton(parent: HTMLElement | null = null): void {
		if (!parent) {
			const footer = document.querySelector<HTMLElement>(
				BUY_BUTTONS_CONFIG.selectors.footer
			);
			const productFormButtons = document.querySelector<HTMLElement>(
				BUY_BUTTONS_CONFIG.selectors.productFormButtons
			);

			this.addPriceToPreorderButton(footer);
			this.addPriceToPreorderButton(productFormButtons);
			return;
		}

		if (!parent) return;

		const preorderTargetEls = parent.querySelectorAll<HTMLElement>(
			`${BUY_BUTTONS_CONFIG.selectors.preorderButton}:not(.hidden)`
		);

		if (preorderTargetEls.length === 0) {
			setTimeout(() => {
				this.addPriceToPreorderButton(parent);
			}, 50);
			return;
		}

		preorderTargetEls.forEach((el) => {
			const clone = el.cloneNode(true) as HTMLElement;

			// Hide original (if Globo recreates it, it will work with the hidden class)
			el.classList.add('hidden');

			// Append only if not already added
			const clones = el.parentElement?.querySelectorAll(
				`${BUY_BUTTONS_CONFIG.selectors.preorderButton}:not(.hidden)`
			);
			if (clones && clones.length > 1) return;

			// Add price to clone button
			clone.innerHTML = `Pre Order for ${this.price}`;

			el.parentElement?.appendChild(clone);
		});
	}

	/**
	 * Update CTA buttons based on current state
	 */
	update(): void {
		if (!this.isPriceReady || !this.price) return;

		if (this.isPreorder) {
			this.addPriceToPreorderButton();
		} else {
			this.addPriceToBuyButton();
		}

		// Signal completion after first update
		if (!this.isInitialized) {
			this.markComplete();
		}
	}

	/**
	 * Mark as complete and clear timeout
	 */
	private markComplete(): void {
		if (this.initializationTimeout) {
			clearTimeout(this.initializationTimeout);
			this.initializationTimeout = null;
		}
		this.isInitialized = true;
		this.onComplete?.();
	}

	/**
	 * Force completion without price update (fallback)
	 */
	private forceComplete(): void {
		console.warn('⚠️ CTAManager completing without price update', {
			isPriceReady: this.isPriceReady,
			hasPrice: !!this.price,
			isPreorder: this.isPreorder
		});
		this.markComplete();
	}

	/**
	 * Clean up resources
	 */
	destroy(): void {
		if (this.initializationTimeout) {
			clearTimeout(this.initializationTimeout);
			this.initializationTimeout = null;
		}
	}
}

