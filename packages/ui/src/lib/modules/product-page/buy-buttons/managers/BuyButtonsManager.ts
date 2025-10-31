import { PriceManager } from './PriceManager.js';
import { CTAManager } from './CTAManager.js';
import { ResponsiveManager } from './ResponsiveManager.js';
import { FooterCTAManager } from './FooterCTAManager.js';
import { PaymentOptionManager } from './PaymentOptionManager.js';
import { SkeletonManager } from './SkeletonManager.js';
import { BUY_BUTTONS_CONFIG } from '../config.js';
import { frontendLogger as logger } from '../../../../utils/loggers/frontend-logger.js';
import { isPreorderProduct } from './preorder.js';
import { CompletionTracker } from '../utils/CompletionTracker.js';
import type { CompletionCallback } from '../types.js';

/**
 * Main orchestrator for product buy buttons functionality
 * Coordinates price observation, CTA updates, responsive layout, and footer management
 */
export class BuyButtonsManager {
	private readonly debug: boolean;
	
	private priceManager: PriceManager;
	private ctaManager: CTAManager;
	private responsiveManager: ResponsiveManager;
	private footerManager: FooterCTAManager;
	private paymentOptionManager: PaymentOptionManager;
	private skeletonManager: SkeletonManager;
	private completionTracker: CompletionTracker;
	private externalCallback?: CompletionCallback;

	constructor() {
		this.debug = BUY_BUTTONS_CONFIG.debug.enabled;
		this.priceManager = new PriceManager();
		this.ctaManager = new CTAManager();
		this.responsiveManager = new ResponsiveManager();
		this.paymentOptionManager = new PaymentOptionManager();
		this.footerManager = new FooterCTAManager(this.paymentOptionManager);
		this.skeletonManager = new SkeletonManager();
		this.completionTracker = new CompletionTracker(this.debug);
	}

	/**
	 * Set completion callback to be called when all managers finish initialization
	 */
	onComplete(callback: CompletionCallback): void {
		this.externalCallback = callback;
	}

	/**
	 * Initialize all buy button functionality
	 */
	init(): void {
		// Show skeleton loading state
		this.skeletonManager.showSkeletons();

		// Register managers that will always initialize
		this.completionTracker.register('priceManager');
		this.completionTracker.register('ctaManager');
		this.completionTracker.register('responsiveManager');
		this.completionTracker.register('footerManager');
		this.completionTracker.register('paymentOptionManager');

		// Register internal completion callback (always runs)
		this.completionTracker.onComplete(() => {
			if (this.debug) logger.debug('All buy button managers initialized successfully');
			this.skeletonManager.hideSkeletons();
			
			// Call external callback if provided
			this.externalCallback?.();
		});

		if (this.debug) {
			logger.debug('🚀 Initializing Buy Buttons Manager');
			this.completionTracker.startPolling();
		}

		// Setup completion callbacks
		this.priceManager.setCompletionCallback(() => {
			this.completionTracker.markComplete('priceManager');
		});

		this.ctaManager.setCompletionCallback(() => {
			this.completionTracker.markComplete('ctaManager');
		});

		this.responsiveManager.setCompletionCallback(() => {
			this.completionTracker.markComplete('responsiveManager');
		});

		this.footerManager.setCompletionCallback(() => {
			this.completionTracker.markComplete('footerManager');
		});

		this.paymentOptionManager.setCompletionCallback(() => {
			this.completionTracker.markComplete('paymentOptionManager');
		});

		// Initialize payment option manager (without observer initially)
		// This makes getPaymentOptionsInfo() available for FooterCTAManager
		this.paymentOptionManager.initWithoutObserver();

		// Setup price subscription
		this.priceManager.subscribe((newPrice) => {
			this.ctaManager.setPrice(newPrice);
		});

		// Start price observation
		this.priceManager.startObserving();

		// Check if preorder was already detected (event fired before this init)
		if (isPreorderProduct()) {
			if (this.debug) logger.debug('Preorder product detected via global state');
			this.ctaManager.setIsPreorder(true);
			// Initialize payment option visibility management with observer
			// This sets up the hiding behavior for single options
			this.paymentOptionManager.init();
		}

		// Setup preorder listener (Globo integration) for cases where event fires after init
		document.addEventListener('globo.preorder.show.preorder', () => {
			if (this.debug) logger.debug('Preorder event received in BuyButtonsManager');
			this.ctaManager.setIsPreorder(true);

            // Initialize payment option visibility management with observer
			// This sets up the hiding behavior for single options
			// Only init if not already initialized to avoid duplicate observers
            this.paymentOptionManager.init();
		});

		// Setup price initialization listener
		this.setupPriceInitializationListener();

		// Move CTA to footer (for mobile sticky footer)
		this.footerManager.moveCtaToFooter();

		// Handle responsive layout
		this.responsiveManager.init();
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
					this.ctaManager.update();
				}
			});
		}
	}

	/**
	 * Clean up all resources
	 */
	destroy(): void {
		this.priceManager.destroy();
		this.ctaManager.destroy();
		this.responsiveManager.destroy();
		this.paymentOptionManager.destroy();
		this.skeletonManager.destroy();
		this.completionTracker.destroy();
	}
}

