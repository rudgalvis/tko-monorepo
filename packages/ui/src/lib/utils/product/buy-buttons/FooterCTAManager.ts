import { BUY_BUTTONS_CONFIG } from './config.js';
import type { PaymentOptionManager } from './PaymentOptionManager.js';

/**
 * Manages moving CTA buttons to footer for mobile layout
 */
export class FooterCTAManager {
	private productForm: HTMLElement | null = null;
	private footer: HTMLElement | null = null;
	private isInitialized = false;
	private onComplete?: () => void;
	private paymentOptionManager: PaymentOptionManager;

	constructor(paymentOptionManager: PaymentOptionManager) {
		this.productForm = document.querySelector(BUY_BUTTONS_CONFIG.selectors.productForm);
		this.footer = document.querySelector(BUY_BUTTONS_CONFIG.selectors.footer);
		this.paymentOptionManager = paymentOptionManager;
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
	moveCtaToFooter(): void {
		if (!this.productForm || !this.footer) {
			// Signal completion even if elements not found
			if (!this.isInitialized) {
				this.isInitialized = true;
				this.onComplete?.();
			}
			return;
		}

		const footerContent = this.productForm.cloneNode(true) as HTMLElement;
		this.cleanFooter(footerContent);

		this.footer.prepend(footerContent);
		
		// Signal completion after footer is populated
		if (!this.isInitialized) {
			this.isInitialized = true;
			this.onComplete?.();
		}
	}

	/**
	 * Clean footer content by removing payment options
	 * Uses PaymentOptionManager to efficiently check if payment options exist
	 * Note: PaymentOptionManager must be initialized before this is called
	 */
	private cleanFooter(footerContent: HTMLElement): void {
		// Check if payment options exist on the page using PaymentOptionManager
		// This is a simple DOM query - no async waiting needed
		const paymentInfo = this.paymentOptionManager.getPaymentOptionsInfo();
		
		// If payment options exist on the page, remove them from the cloned footer content
		if (paymentInfo.hasPaymentOptions) {
			const paymentOptions = footerContent.querySelector(
				BUY_BUTTONS_CONFIG.selectors.paymentOptions
			);
			
			if (paymentOptions) {
				paymentOptions.parentElement?.removeChild(paymentOptions);
			}
		}
	}
}

