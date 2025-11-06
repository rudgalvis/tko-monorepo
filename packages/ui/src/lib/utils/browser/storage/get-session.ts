import { isBrowser } from "../is-browser.js";

export const getSession = (name: string, defaultValue: string | null = null): string | null => {
	if (!name.trim() || !isBrowser()) {
		return defaultValue;
	}

	const value = sessionStorage.getItem(name);

	if (!value) {
		return defaultValue;
	}

	// Try to parse the value as JSON
	try {
		return JSON.parse(value);
	} catch (error) {
		console.error(`Error getting session "${name}":`, error);
		return defaultValue;
	}
};

export const setSession = (name: string, value: string | object | number | boolean | null) => {
	if (!name.trim() || !isBrowser()) {
		return;
	}

	// Try to parse the value as JSON
	try {
		value = JSON.stringify(value);
	} catch (error) {
		console.error(`Error setting session "${name}":`, error);
		return;
	}

	sessionStorage.setItem(name, value);
};

export const removeSession = (name: string) => {
	if (!name.trim() || !isBrowser()) {
		return;
	}

	sessionStorage.removeItem(name);
};

