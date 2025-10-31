import { frontendLogger as logger } from '../../loggers/frontend-logger.js';

/**
 * Manages skeleton loading state for buy buttons section
 * Shows a single skeleton overlay with fixed height during initialization
 * Height restores when skeleton is removed (may cause visual pop)
 * 
 * Also handles hiding third-party elements that appear dynamically during skeleton state
 * to prevent visual flicker. Specifically handles Globo Back In Stock button which loads
 * asynchronously and would otherwise briefly flash before skeleton is removed.
 */
interface StyledElement {
	element: HTMLElement;
	originalHeight: string;
	originalOverflow: string;
	originalMarginBottom: string;
}

export class SkeletonManager {
	private readonly debug: boolean = false;
	private readonly productFormButtonsSelector = '.product-form__buttons';
	private readonly SKELETON_HEIGHT = '60px';
	private readonly HIDE_STYLE_ID = 'skeleton-manager-hide-styles';
	
	private styledElements: StyledElement[] = [];
	private hideStyleElement: HTMLStyleElement | null = null;

	/**
	 * Show skeleton loading state
	 * Called on initialization
	 */
	showSkeletons(): void {
		this.createSkeleton();
		this.injectHideStyles();
		if (this.debug) logger.debug('Skeleton shown');
	}

	/**
	 * Hide skeleton loading state
	 * Called when all managers complete initialization
	 */
	hideSkeletons(): void {
		setTimeout(() => {
			this.removeSkeleton();
			this.removeHideStyles();
			if (this.debug) logger.debug('Skeleton hidden');
		}, 150)
	}

	/**
	 * Create skeleton loading overlay on all product form buttons instances
	 * Sets fixed height, hidden overflow, margin-bottom, and adds skeleton overlay
	 * Handles both original and cloned (footer) instances
	 */
	private createSkeleton(): void {
		const productFormButtonsElements = document.querySelectorAll(this.productFormButtonsSelector);
		
		if (productFormButtonsElements.length === 0) {
			if (this.debug) logger.debug('No product form buttons found');
			return;
		}

		productFormButtonsElements.forEach((element) => {
			const productFormButtons = element as HTMLElement;
			
			// Store original styles
			const originalHeight = productFormButtons.style.height || '';
			const originalOverflow = productFormButtons.style.overflow || '';
			const originalMarginBottom = productFormButtons.style.marginBottom || '';
			
			// Set fixed height, hidden overflow, and margin-bottom
			productFormButtons.style.height = this.SKELETON_HEIGHT;
			productFormButtons.style.overflow = 'hidden';
			productFormButtons.style.marginBottom = '5px';

			// Create skeleton overlay
			const skeletonElement = document.createElement('div');
			skeletonElement.className = 'skeleton-wave';
			skeletonElement.style.cssText = `
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				z-index: 10;
			`;

			productFormButtons.appendChild(skeletonElement);
			
			// Track element and its original styles (not the skeleton)
			this.styledElements.push({
				element: productFormButtons,
				originalHeight,
				originalOverflow,
				originalMarginBottom
			});
		});

		if (this.debug) logger.debug(`Created ${this.styledElements.length} skeleton instance(s)`);
	}

	/**
	 * Remove all skeleton overlays from page and restore original styles
	 * Uses simple approach: removes all .skeleton-wave elements from entire page
	 */
	private removeSkeleton(): void {
		// Remove all skeleton-wave elements from the page
		const allSkeletons = document.querySelectorAll('.skeleton-wave');
		allSkeletons.forEach((skeleton) => {
			skeleton.remove();
		});

		// Restore original styles for tracked elements
		this.styledElements.forEach(({ element, originalHeight, originalOverflow, originalMarginBottom }) => {
			element.style.height = originalHeight;
			element.style.overflow = originalOverflow;
			element.style.marginBottom = originalMarginBottom;
		});

		if (this.debug) {
			logger.debug(`Removed ${allSkeletons.length} skeleton element(s) and restored styles for ${this.styledElements.length} element(s)`);
		}
		
		// Clear tracked elements
		this.styledElements = [];
	}

	/**
	 * Inject CSS to hide elements that should not be visible during skeleton state
	 * 
	 * THE PROBLEM:
	 * When a product is out of stock, the Globo Back In Stock app (#Globo-Back-In-Stock)
	 * loads its button dynamically/asynchronously. This creates a flicker sequence:
	 * 1. Our skeleton shows (covering .product-form__buttons)
	 * 2. Globo button appears (outside our skeleton's coverage area)
	 * 3. User sees Globo button briefly
	 * 4. Our skeleton hides
	 * 5. Globo button remains visible (correct final state)
	 * 
	 * THE SOLUTION:
	 * CSS injection with display: none !important applies instantly to any element
	 * matching #Globo-Back-In-Stock, regardless of when it's added to the DOM.
	 * This prevents the flicker because the button is hidden the moment it appears.
	 * 
	 * WHY NOT DIRECT ELEMENT STYLING:
	 * We can't style the element directly because it doesn't exist yet when we show
	 * the skeleton. Even with MutationObserver, there would be a brief moment where
	 * the element is visible before the observer reacts.
	 * 
	 * WHY CSS INJECTION WORKS:
	 * Browser applies CSS rules instantly when elements are inserted into the DOM.
	 * No race condition, no observer overhead, guaranteed to work.
	 */
	private injectHideStyles(): void {
		// Avoid duplicates
		if (document.getElementById(this.HIDE_STYLE_ID)) {
			if (this.debug) logger.debug('Hide styles already exist');
			return;
		}

		const styleElement = document.createElement('style');
		styleElement.id = this.HIDE_STYLE_ID;
		styleElement.textContent = `
			#Globo-Back-In-Stock {
				display: none !important;
			}
		`;
		
		document.head.appendChild(styleElement);
		this.hideStyleElement = styleElement;
		
		if (this.debug) logger.debug('Hide styles injected');
	}

	/**
	 * Remove injected hide styles to reveal hidden elements
	 * 
	 * Removes the CSS rule so #Globo-Back-In-Stock becomes visible again.
	 * Includes fallback removal by ID in case the element reference is lost
	 * (e.g., if this is called after a page navigation or component remount).
	 */
	private removeHideStyles(): void {
		if (this.hideStyleElement) {
			this.hideStyleElement.remove();
			this.hideStyleElement = null;
			if (this.debug) logger.debug('Hide styles removed');
		}
		
		// Fallback: remove by ID in case element reference is lost
		const existingStyle = document.getElementById(this.HIDE_STYLE_ID);
		if (existingStyle) {
			existingStyle.remove();
			if (this.debug) logger.debug('Hide styles removed via fallback');
		}
	}

	/**
	 * Clean up resources
	 */
	destroy(): void {
		this.removeSkeleton();
		this.removeHideStyles();
	}
}

