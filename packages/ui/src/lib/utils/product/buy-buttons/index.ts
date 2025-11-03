import { BuyButtonsManager } from './managers/BuyButtonsManager.js';
import { loadStyles } from '../../../utils/dom/load-styles.js';
import { frontendLogger as logger } from '../../../utils/loggers/frontend-logger.js';
import nativeStyles from './styles/native.css?raw';
import globoStyles from './styles/globo.css?raw';

// Export all classes for direct usage
export { BuyButtonsManager } from './managers/BuyButtonsManager.js';
export { PriceManager } from './managers/PriceManager.js';
export { CTAManager } from './managers/CTAManager.js';
export { ResponsiveManager } from './managers/ResponsiveManager.js';
export { FooterCTAManager } from './managers/FooterCTAManager.js';
export { PaymentOptionManager } from './managers/PaymentOptionManager.js';
export { isPreorderProduct, setIsPreorder, initPreorderListener } from './managers/preorder.js';
export { BUY_BUTTONS_CONFIG } from './config.js';
export type { PaymentOptionsInfo, PriceCallback, CompletionCallback, StyledElement } from './types.js';

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

    loadStyles(nativeStyles, { id: 'buy-buttons-styles' });
    loadStyles(globoStyles, { id: 'buy-buttons-globo-styles' });

    const manager = new BuyButtonsManager();
    
    // Set completion callback if provided
    if (onComplete) {
        manager.onComplete(onComplete);
    }
    
    manager.init();

    // Expose to window for external access if needed
    window.BuyButtonsManager = manager;
}
