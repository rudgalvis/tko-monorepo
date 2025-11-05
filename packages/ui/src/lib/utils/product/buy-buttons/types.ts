/**
 * Shared type definitions for buy-buttons module
 */

/**
 * Callback function type for price changes
 */
export type PriceCallback = (price: string) => void;

/**
 * Callback function type for completion events
 */
export type CompletionCallback = () => void;

/**
 * Information about available payment options
 */
export interface PaymentOptionsInfo {
	hasPaymentOptions: boolean;
	optionCount: number;
}

/**
 * Styled element information for skeleton manager
 * Tracks original styles to restore after skeleton is removed
 */
export interface StyledElement {
	element: HTMLElement;
	originalHeight: string;
	originalOverflow: string;
	originalMarginBottom: string;
}