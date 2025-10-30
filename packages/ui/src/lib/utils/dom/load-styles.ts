/**
 * Options for loading styles
 */
interface LoadStylesOptions {
	id?: string;
	prepend?: boolean;
}

/**
 * Load CSS styles into the document
 * Works in both development and production environments
 * 
 * @param styles - CSS string content to inject
 * @param options - Configuration options
 */
export const loadStyles = (styles: string, options: LoadStylesOptions = {}): void => {
	if (typeof document === 'undefined') {
		return;
	}

	// Prevent duplicate style tags if ID is provided
	if (options.id && document.getElementById(options.id)) {
		return;
	}

	const style = document.createElement('style');
	if (options.id) {
		style.id = options.id;
		style.setAttribute('data-source', options.id);
	}

	style.textContent = styles;

	if (options.prepend && document.head.firstChild) {
		document.head.insertBefore(style, document.head.firstChild);
	} else {
		document.body.insertBefore(style, document.body.firstChild);
	}
};

/**
 * Load styles from a URL (for async loading)
 * @param url - URL to the CSS file
 * @param options - Configuration options
 */
export const loadStylesFromURL = async (url: string, options?: LoadStylesOptions): Promise<void> => {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Failed to fetch styles from ${url}: ${response.statusText}`);
		}
		const css = await response.text();
		loadStyles(css, options);
	} catch (error) {
		console.error(`Failed to load styles from ${url}:`, error);
	}
};

/**
 * Check if styles are already loaded by ID
 * @param id - The ID to check for
 */
export const isStylesLoaded = (id: string): boolean => {
	if (typeof document === 'undefined') {
		return false;
	}
	return document.getElementById(id) !== null;
};