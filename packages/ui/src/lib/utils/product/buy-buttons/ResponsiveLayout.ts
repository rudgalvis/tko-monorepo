import { BUY_BUTTONS_CONFIG } from './config.js';

/**
 * Manages responsive transformations for product form buttons
 * Handles different layouts for mobile and desktop views
 */
export class ResponsiveLayoutManager {
	private productForm: HTMLElement | null = null;
	private boundHandleResize: () => void;
	private isInitialized = false;
	private onComplete?: () => void;

	constructor(productFormSelector = BUY_BUTTONS_CONFIG.selectors.productForm) {
		this.productForm = document.querySelector(productFormSelector);
		this.boundHandleResize = this.handleResize.bind(this);
	}

	/**
	 * Set completion callback for when layout initialization is complete
	 */
	setCompletionCallback(callback: () => void): void {
		this.onComplete = callback;
		// If already initialized, call immediately
		if (this.isInitialized) {
			callback();
		}
	}

	/**
	 * Initialize responsive layout handling
	 */
	init(): void {
		this.handleResize();
		window.addEventListener('resize', this.boundHandleResize);
		
		// Signal completion after initial layout is set
		if (!this.isInitialized) {
			this.isInitialized = true;
			this.onComplete?.();
		}
	}

	/**
	 * Handle window resize events
	 */
	private handleResize(): void {
		if (window.innerWidth <= BUY_BUTTONS_CONFIG.breakpoints.mobile) {
			this.transformForMobile();
		} else {
			this.transformForDesktop();
		}
	}

	/**
	 * Transform layout for mobile view
	 * Hides buttons in sidebar (they're shown in footer instead)
	 */
	private transformForMobile(): void {
		if (!this.productForm) return;

		const buttons = this.productForm.querySelectorAll<HTMLElement>(
			BUY_BUTTONS_CONFIG.selectors.productFormSubmit
		);
		buttons.forEach((btn) => (btn.style.display = 'none'));

		const disclaimer = this.productForm.querySelector<HTMLElement>(
			BUY_BUTTONS_CONFIG.selectors.disclaimer
		);
		if (disclaimer) disclaimer.style.display = 'none';
	}

	/**
	 * Transform layout for desktop view
	 * Shows buttons in sidebar
	 */
	private transformForDesktop(): void {
		if (!this.productForm) return;

		const buttons = this.productForm.querySelectorAll<HTMLElement>(
			BUY_BUTTONS_CONFIG.selectors.productFormSubmit
		);
		buttons.forEach((btn) => (btn.style.display = ''));

		const disclaimer = this.productForm.querySelector<HTMLElement>(
			BUY_BUTTONS_CONFIG.selectors.disclaimer
		);
		if (disclaimer) disclaimer.style.display = '';
	}

	/**
	 * Clean up event listeners
	 */
	destroy(): void {
		window.removeEventListener('resize', this.boundHandleResize);
	}
}

