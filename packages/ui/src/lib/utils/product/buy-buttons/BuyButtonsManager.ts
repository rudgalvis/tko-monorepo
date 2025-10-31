import { PriceObserver } from './PriceObserver.js';
import { CTAUpdater } from './CTAUpdater.js';
import { ResponsiveLayoutManager } from './ResponsiveLayout.js';
import { FooterCTAManager } from './FooterCTAManager.js';
import { PaymentOptionManager } from './PaymentOptionManager.js';
import { SkeletonManager } from './SkeletonManager.js';
import { BUY_BUTTONS_CONFIG } from './config.js';
import { frontendLogger as logger } from '../../loggers/frontend-logger.js';

/**
 * Main orchestrator for product buy buttons functionality
 * Coordinates price observation, CTA updates, responsive layout, and footer management
 */
export class BuyButtonsManager {
	private priceObserver: PriceObserver;
	private ctaUpdater: CTAUpdater;
	private responsiveLayout: ResponsiveLayoutManager;
	private footerManager: FooterCTAManager;
	private paymentOptionManager: PaymentOptionManager;
	private skeletonManager: SkeletonManager;
	
	private completionTracking = new Map<string, boolean>();
	private completionPollInterval: ReturnType<typeof setInterval> | null = null;
	private readonly debug = false;

	private onAllComplete() {
        if (this.debug) logger.debug('All buy button managers initialized successfully');
		this.skeletonManager.hideSkeletons();
    }

	constructor() {
		this.priceObserver = new PriceObserver();
		this.ctaUpdater = new CTAUpdater();
		this.responsiveLayout = new ResponsiveLayoutManager();
		this.paymentOptionManager = new PaymentOptionManager();
		this.footerManager = new FooterCTAManager(this.paymentOptionManager);
		this.skeletonManager = new SkeletonManager();
	}

	/**
	 * Set completion callback to be called when all managers finish initialization
	 */
	onComplete(callback: () => void): void {
		this.onAllComplete = callback;
	}

	/**
	 * Track manager completion and check if all are done
	 */
	private markManagerComplete(managerName: string): void {
		if (this.debug) logger.debug(`✅ Manager completed: ${managerName}`);
		this.completionTracking.set(managerName, true);
		this.logCompletionStatus();
		this.checkAllComplete();
	}

	/**
	 * Log current completion status for debugging
	 */
	private logCompletionStatus(): void {
		if (this.debug) {
			const status = Array.from(this.completionTracking.entries()).map(
				([manager, complete]) => ({
					manager,
					complete,
					status: complete ? '✅ DONE' : '⏳ WAITING'
				})
			);
			logger.debug('📊 Buy Buttons Manager Status:', status);
		}
	}

	/**
	 * Start polling to track pending completions
	 */
	private startCompletionPolling(): void {
		if (this.completionPollInterval) return;

		this.completionPollInterval = setInterval(() => {
			const pendingManagers = Array.from(this.completionTracking.entries())
				.filter(([, complete]) => !complete)
				.map(([name]) => name);

			if (pendingManagers.length > 0) {
				if (this.debug) logger.warn(
					`⏳ Still waiting for completion of: ${pendingManagers.join(', ')}`
				);
			}
		}, 5000); // Poll every 5 seconds
	}

	/**
	 * Stop polling for completions
	 */
	private stopCompletionPolling(): void {
		if (this.completionPollInterval) {
			clearInterval(this.completionPollInterval);
			this.completionPollInterval = null;
		}
	}

	/**
	 * Check if all initialized managers are complete
	 */
	private checkAllComplete(): void {
		const expectedManagers = Array.from(this.completionTracking.keys());
		const allComplete = expectedManagers.every(
			(manager) => this.completionTracking.get(manager) === true
		);

		if (allComplete && expectedManagers.length > 0) {
			if (this.debug) logger.debug('✅ All buy button managers initialized successfully', {
				managers: expectedManagers,
			});
			this.stopCompletionPolling();
			this.onAllComplete?.();
		}
	}

	/**
	 * Initialize all buy button functionality
	 */
	init(): void {
		// Show skeleton loading state
		this.skeletonManager.showSkeletons();

		// Register managers that will always initialize
		this.completionTracking.set('priceObserver', false);
		this.completionTracking.set('ctaUpdater', false);
		this.completionTracking.set('responsiveLayout', false);
		this.completionTracking.set('footerManager', false);
		this.completionTracking.set('paymentOptionManager', false);

		if (this.debug) logger.debug('🚀 Initializing Buy Buttons Manager');
		if (this.debug) this.logCompletionStatus();
		if (this.debug) this.startCompletionPolling();

		// Setup completion callbacks
		this.priceObserver.setCompletionCallback(() => {
			this.markManagerComplete('priceObserver');
		});

		this.ctaUpdater.setCompletionCallback(() => {
			this.markManagerComplete('ctaUpdater');
		});

		this.responsiveLayout.setCompletionCallback(() => {
			this.markManagerComplete('responsiveLayout');
		});

		this.footerManager.setCompletionCallback(() => {
			this.markManagerComplete('footerManager');
		});

		this.paymentOptionManager.setCompletionCallback(() => {
			this.markManagerComplete('paymentOptionManager');
		});

		// Initialize payment option manager (without observer initially)
		// This makes getPaymentOptionsInfo() available for FooterCTAManager
		this.paymentOptionManager.initWithoutObserver();

		// Setup price subscription
		this.priceObserver.subscribe((newPrice) => {
			this.ctaUpdater.setPrice(newPrice);
		});

		// Start price observation
		this.priceObserver.startObserving();

		// Setup preorder listener (Globo integration)
		document.addEventListener('globo.preorder.show.preorder', () => {
			this.ctaUpdater.setIsPreorder(true);

            // Initialize payment option visibility management with observer
			// This sets up the hiding behavior for single options
            this.paymentOptionManager.init();
		});

		// Setup price initialization listener
		this.setupPriceInitializationListener();

		// Move CTA to footer (for mobile sticky footer)
		this.footerManager.moveCtaToFooter();

		// Handle responsive layout
		this.responsiveLayout.init();
	}

	/**
	 * Listen for price initialization from product-price web component
	 */
	private setupPriceInitializationListener(): void {
		const productPriceElement = document.querySelector(
			BUY_BUTTONS_CONFIG.selectors.productPriceElement
		);

		if (productPriceElement) {
			productPriceElement.addEventListener('shouldShowPriceChanged', (event: Event) => {
				const customEvent = event as CustomEvent;
				const shouldShowPrice = customEvent.detail?.shouldShowPrice;

				if (shouldShowPrice) {
					this.ctaUpdater.update();
				}
			});
		}
	}

	/**
	 * Clean up all resources
	 */
	destroy(): void {
		this.priceObserver.destroy();
		this.responsiveLayout.destroy();
		this.paymentOptionManager.destroy();
		this.skeletonManager.destroy();
	}
}
