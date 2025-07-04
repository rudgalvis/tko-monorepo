export const timedLog = (message: string, style?: string, ...args: any[]): void => {
	const timestamp = new Date().toLocaleTimeString('LT');
	const defaultStyle = 'color: #2563eb; font-weight: bold;';
	const messageStyle = 'color: #374151;';

	console.log(
		`%c[${timestamp}]%c ${message}`,
		style || defaultStyle,
		messageStyle,
		...args
	);
}
