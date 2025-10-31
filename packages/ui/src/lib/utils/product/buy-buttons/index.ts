import { BuyButtonsManager } from './BuyButtonsManager.js';
import { loadStyles } from '../../dom/load-styles.js';
import { frontendLogger as logger } from '../../loggers/frontend-logger.js';
import buyButtonsStyles from './buy-buttons.css?raw';
import buyButtonsGloboStyles from './buy-buttons-globo.css?raw';



// Export all classes for direct usage
export { BuyButtonsManager } from './BuyButtonsManager.js';
export { PriceObserver } from './PriceObserver.js';
export { CTAUpdater } from './CTAUpdater.js';
export { ResponsiveLayoutManager } from './ResponsiveLayout.js';
export { FooterCTAManager } from './FooterCTAManager.js';
export { PaymentOptionManager } from './PaymentOptionManager.js';
export { PreorderStateManager } from './preorder-state.js';
export { BUY_BUTTONS_CONFIG } from './config.js';

declare global {
	interface Window {
		BuyButtonsManager: BuyButtonsManager;
	}
}

/**
 * Auto-initializer for buy buttons functionality
 * @param onComplete Optional callback to be called when all managers finish initialization
 */
export const buyButtonsInitialize = (onComplete?: () => void) => {
	console.log('[ui]', 'buyButtonsInitialize');

	// Destroy previous manager if it exists (for SPA/client-side navigation)
	if (window.BuyButtonsManager) {
		logger.debug('🧹 Destroying previous BuyButtonsManager instance');
		window.BuyButtonsManager.destroy();
	}

    loadStyles(buyButtonsStyles, { id: 'buy-buttons-styles' });
    loadStyles(buyButtonsGloboStyles, { id: 'buy-buttons-globo-styles' });

    const manager = new BuyButtonsManager();
    
    // Set completion callback if provided
    if (onComplete) {
        manager.onComplete(onComplete);
    }
    
    manager.init();

    // Expose to window for external access if needed
    window.BuyButtonsManager = manager;
}

