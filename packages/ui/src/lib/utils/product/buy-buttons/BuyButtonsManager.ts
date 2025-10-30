import { PriceObserver } from './PriceObserver.js';
import { CTAUpdater } from './CTAUpdater.js';
import { ResponsiveLayoutManager } from './ResponsiveLayout.js';
import { FooterCTAManager } from './FooterCTAManager.js';
import { PaymentOptionManager } from './PaymentOptionManager.js';
import { BUY_BUTTONS_CONFIG } from './config.js';

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

	constructor() {
		this.priceObserver = new PriceObserver();
		this.ctaUpdater = new CTAUpdater();
		this.responsiveLayout = new ResponsiveLayoutManager();
		this.footerManager = new FooterCTAManager();
		this.paymentOptionManager = new PaymentOptionManager();
	}

	/**
	 * Initialize all buy button functionality
	 */
	init(): void {
		// Setup price subscription
		this.priceObserver.subscribe((newPrice) => {
			this.ctaUpdater.setPrice(newPrice);
		});

		// Start price observation
		this.priceObserver.startObserving();

		// Setup preorder listener (Globo integration)
		document.addEventListener('globo.preorder.show.preorder', () => {
			this.ctaUpdater.setIsPreorder(true);

            // Initialize payment option visibility management
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
	}
}
