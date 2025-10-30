import { BuyButtonsManager } from './BuyButtonsManager.js';
import { loadStyles } from '../../dom/load-styles.js';
import buyButtonsStyles from './buy-buttons.css?raw';
import buyButtonsGloboStyles from './buy-buttons-globo.css?raw';



// Export all classes for direct usage
export { BuyButtonsManager } from './BuyButtonsManager.js';
export { PriceObserver } from './PriceObserver.js';
export { CTAUpdater } from './CTAUpdater.js';
export { ResponsiveLayoutManager } from './ResponsiveLayout.js';
export { FooterCTAManager } from './FooterCTAManager.js';
export { PaymentOptionManager } from './PaymentOptionManager.js';
export { BUY_BUTTONS_CONFIG } from './config.js';

declare global {
	interface Window {
		BuyButtonsManager: BuyButtonsManager;
	}
}

/**
 * Auto-initializer for buy buttons functionality
 */
export const buyButtonsInitialize = () => {
	console.log('dump', 'buyButtonsInitialize');

    loadStyles(buyButtonsStyles, { id: 'buy-buttons-styles' });
    loadStyles(buyButtonsGloboStyles, { id: 'buy-buttons-globo-styles' });

    const manager = new BuyButtonsManager();
    manager.init();

    // Expose to window for external access if needed
    window.BuyButtonsManager = manager;
}

