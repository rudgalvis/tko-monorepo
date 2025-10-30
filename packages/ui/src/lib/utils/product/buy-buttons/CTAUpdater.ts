import { BUY_BUTTONS_CONFIG } from './config.js';

/**
 * Manages CTA button text updates based on price and product state (regular vs preorder)
 */
export class CTAUpdater {
	private isPriceReady = false;
	private isPreorder = false;
	private price: string | undefined;
	private isInitialized = false;
	private onComplete?: () => void;

	/**
	 * Set completion callback for when CTA updates are complete
	 */
	setCompletionCallback(callback: () => void): void {
		this.onComplete = callback;
		// If already initialized, call immediately
		if (this.isInitialized) {
			callback();
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
				'.product-form__buttons'
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
			this.isInitialized = true;
			this.onComplete?.();
		}
	}
}

