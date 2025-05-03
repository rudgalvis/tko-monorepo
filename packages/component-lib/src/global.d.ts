// src/global.d.ts
interface Window {
	CartJS?: {
		addItem: (id: string, quantity: number) => void;
		// Add other methods and properties of CartJS as needed
	};
}