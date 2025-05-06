import type { Action } from 'svelte/action';

/**
 * When using custom elements i.e.
 *
 * <product-price price="{{ product.price | money }}">
 *     <span class="current-price">{{ product.price | money }}</span>
 *     <span class="compare-price">{{ product.compare_at_price | money }}</span>
 * </product-price>
 *
 * Children nodes will be eagerly rendered. That means always rendered, no matter
 * if <slot> elements are set up in svelte component.
 *
 * This is fix to remove them.
 * It's important to have spans for SEO fyi.
 * */
export const removeNonComponentChildren: Action = (node: HTMLElement) => {
	Array.from(node.parentElement?.children || [])
		.filter((child) => child !== node) // Filter children that are not in component
		.forEach((child) => child.parentElement?.removeChild(child)); // Remove them from DOM

	return {};
};
