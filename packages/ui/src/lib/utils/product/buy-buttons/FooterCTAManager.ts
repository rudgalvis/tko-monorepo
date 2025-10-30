import { BUY_BUTTONS_CONFIG } from './config.js';

/**
 * Manages moving CTA buttons to footer for mobile layout
 */
export class FooterCTAManager {
	private productForm: HTMLElement | null = null;
	private footer: HTMLElement | null = null;
	private isInitialized = false;
	private onComplete?: () => void;

	constructor() {
		this.productForm = document.querySelector(BUY_BUTTONS_CONFIG.selectors.productForm);
		this.footer = document.querySelector(BUY_BUTTONS_CONFIG.selectors.footer);
	}

	/**
	 * Set completion callback for when footer move is complete
	 */
	setCompletionCallback(callback: () => void): void {
		this.onComplete = callback;
		// If already initialized, call immediately
		if (this.isInitialized) {
			callback();
		}
	}

	/**
	 * Move CTA to footer (for mobile sticky footer)
	 */
	async moveCtaToFooter(): Promise<void> {
		if (!this.productForm || !this.footer) {
			// Signal completion even if elements not found
			if (!this.isInitialized) {
				this.isInitialized = true;
				this.onComplete?.();
			}
			return;
		}

		let footerContent = this.productForm.cloneNode(true) as HTMLElement;
		footerContent = await this.cleanFooter(footerContent);

		this.footer.prepend(footerContent);
		
		// Signal completion after footer is populated
		if (!this.isInitialized) {
			this.isInitialized = true;
			this.onComplete?.();
		}
	}

	/**
	 * Clean footer content by removing payment options
	 * (Globo adds these dynamically, we need to wait for them)
	 */
	private async cleanFooter(
		footerContent: HTMLElement,
		retry = 0
	): Promise<HTMLElement> {
		const paymentOptions = footerContent.querySelector(
			BUY_BUTTONS_CONFIG.selectors.paymentOptions
		);

		if (!paymentOptions) {
			if (retry >= BUY_BUTTONS_CONFIG.retry.maxFooterRetries) {
				return footerContent;
			}

			await new Promise((resolve) =>
				setTimeout(resolve, BUY_BUTTONS_CONFIG.retry.footerInterval)
			);
			return this.cleanFooter(footerContent, retry + 1);
		}

		paymentOptions.parentElement?.removeChild(paymentOptions);
		return footerContent;
	}
}

