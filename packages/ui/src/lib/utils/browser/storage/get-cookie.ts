export const getCookie = (name: string, defaultValue: string | null = null): string | null => {
	if (!name.trim() || typeof document === 'undefined' || !document.cookie) {
		return defaultValue;
	}

	try {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);

		if (parts.length === 2) {
			const cookieValue = parts.pop();
			if (cookieValue) {
				return decodeURIComponent(cookieValue.split(';')[0]);
			}
		}

		return defaultValue;
	} catch (error) {
		console.error(`Error getting cookie "${name}":`, error);
		return defaultValue;
	}
};

export const cookieExists = (name: string): boolean => {
	if (!name.trim() || typeof document === 'undefined' || !document.cookie) {
		return false;
	}

	try {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		return parts.length === 2;
	} catch (error) {
		console.error(`Error checking if cookie "${name}" exists:`, error);
		return false;
	}
};

