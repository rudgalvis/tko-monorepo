import { BUY_BUTTONS_CONFIG } from './config.js';

export type PriceCallback = (price: string) => void;

/**
 * Observes price changes in the DOM and notifies subscribers.
 * Uses the observer pattern to allow multiple parts of the app to react to price updates.
 */
export class PriceObserver {
	private subscribers = new Set<PriceCallback>();
	private currentPrice: string | null = null;
	private observer: MutationObserver | null = null;
	private priceElement: HTMLElement | null = null;
	private retryCount = 0;
	private isInitialized = false;
	private onComplete?: () => void;

	/**
	 * Set completion callback for when observer finishes initialization
	 */
	setCompletionCallback(callback: () => void): void {
		this.onComplete = callback;
		// If already initialized, call immediately
		if (this.isInitialized) {
			callback();
		}
	}

	/**
	 * Subscribe to price changes
	 * @param callback Function to call when price changes
	 * @returns Unsubscribe function
	 */
	subscribe(callback: PriceCallback): () => void {
		this.subscribers.add(callback);
		// If we already have a price, notify the new subscriber immediately
		if (this.currentPrice !== null) {
			callback(this.currentPrice);
		}
		return () => this.subscribers.delete(callback);
	}

	/**
	 * Notify all subscribers of price changes
	 */
	private notifySubscribers(newPrice: string): void {
		if (newPrice !== this.currentPrice) {
			this.currentPrice = newPrice;
			this.subscribers.forEach((callback) => {
				try {
					callback(newPrice);
				} catch (error) {
					console.error('Price observer subscriber error:', error);
				}
			});
		}
	}

	/**
	 * Get current price synchronously
	 */
	getCurrentPrice(): string | null {
		return this.currentPrice;
	}

	/**
	 * Get price with retry logic (backward compatibility)
	 */
	async getPrice(retry = 0): Promise<string | null> {
		const priceEl = document.querySelector<HTMLElement>(
			BUY_BUTTONS_CONFIG.selectors.priceValue
		);

		if (!priceEl && retry <= BUY_BUTTONS_CONFIG.retry.maxAttempts) {
			await new Promise((resolve) =>
				setTimeout(resolve, BUY_BUTTONS_CONFIG.retry.interval)
			);
			return this.getPrice(retry + 1);
		} else if (!priceEl) {
			console.error('Could not find price element');
			return null;
		}

		const price = priceEl.innerText.trim();
		this.notifySubscribers(price);
		return price;
	}

	/**
	 * Start observing price element changes
	 */
	startObserving(): void {
		if (this.observer) {
			this.observer.disconnect();
		}

		this.findAndObservePriceElement();

		if (!this.priceElement) {
			this.retryObserving();
		}
	}

	/**
	 * Find price element and set up observer
	 */
	private findAndObservePriceElement(): void {
		this.priceElement = document.querySelector<HTMLElement>(
			BUY_BUTTONS_CONFIG.selectors.priceValue
		);

		if (this.priceElement) {
			this.observer = new MutationObserver((mutations) => {
				mutations.forEach((mutation) => {
					if (mutation.type === 'childList' || mutation.type === 'characterData') {
						const newPrice = this.priceElement?.innerText.trim();
						if (newPrice && newPrice !== this.currentPrice) {
							this.notifySubscribers(newPrice);
						}
					}
				});
			});

			this.observer.observe(this.priceElement, {
				childList: true,
				subtree: true,
				characterData: true
			});

			const initialPrice = this.priceElement.innerText.trim();
			if (initialPrice) {
				this.notifySubscribers(initialPrice);
			}

			// Mark as initialized and signal completion
			if (!this.isInitialized) {
				this.isInitialized = true;
				this.onComplete?.();
			}
		}
	}

	/**
	 * Retry mechanism for finding price element
	 */
	private retryObserving(): void {
		if (this.retryCount < BUY_BUTTONS_CONFIG.retry.maxAttempts) {
			this.retryCount++;
			setTimeout(() => {
				this.findAndObservePriceElement();
				if (!this.priceElement) {
					this.retryObserving();
				}
			}, BUY_BUTTONS_CONFIG.retry.interval);
		} else {
			console.warn('Price observer: Could not find price element after max retries');
			// Signal completion even if price element wasn't found
			if (!this.isInitialized) {
				this.isInitialized = true;
				this.onComplete?.();
			}
		}
	}

	/**
	 * Stop observing
	 */
	stopObserving(): void {
		if (this.observer) {
			this.observer.disconnect();
			this.observer = null;
		}
		this.priceElement = null;
		this.retryCount = 0;
	}

	/**
	 * Clean up all resources
	 */
	destroy(): void {
		this.stopObserving();
		this.subscribers.clear();
		this.currentPrice = null;
	}
}

