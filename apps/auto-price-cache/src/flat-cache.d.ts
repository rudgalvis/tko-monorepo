/**
 * Type definitions for flat-cache
 */
declare module 'flat-cache' {
	export interface Cache {
		getKey(key: string): any;
		setKey(key: string, value: any): void;
		removeKey(key: string): boolean;
		save(noPrune?: boolean): void;
		destroy(): void;
		all(): Record<string, any>;
		keys(): string[];
	}

	export function load(cacheId: string, cacheDir?: string): Cache;
	export function clearAll(cacheDir?: string): void;
	export function clearCacheById(cacheId: string, cacheDir?: string): void;
	export function create(cacheId: string, cacheDir?: string): Cache;
}

