import { frontendLogger as logger } from '../../loggers/frontend-logger.js';

/**
 * Manages skeleton loading state for buy buttons section
 * Shows a single skeleton overlay with fixed height during initialization
 * Height restores when skeleton is removed (may cause visual pop)
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
	
	private styledElements: StyledElement[] = [];

	/**
	 * Show skeleton loading state
	 * Called on initialization
	 */
	showSkeletons(): void {
		this.createSkeleton();
		if (this.debug) logger.debug('Skeleton shown');
	}

	/**
	 * Hide skeleton loading state
	 * Called when all managers complete initialization
	 */
	hideSkeletons(): void {
		this.removeSkeleton();
		if (this.debug) logger.debug('Skeleton hidden');
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
	 * Clean up resources
	 */
	destroy(): void {
		this.removeSkeleton();
	}
}

