export const isIosSafari = () => {
	// Check if we're in a browser environment
	if (typeof window === 'undefined' || !window.navigator) {
		return false;
	}

	const ua = window.navigator.userAgent;

	// Check for iOS
	const isIOS = /iPad|iPhone|iPod/.test(ua) ||
		(navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

	// Check for Safari (but not Chrome or other browsers)
	const isSafari = /Safari/.test(ua) && !/Chrome/.test(ua) && !/CriOS/.test(ua) && !/FxiOS/.test(ua);

	return isIOS && isSafari;
};
