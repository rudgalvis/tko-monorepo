/**
 * Type definitions for flat-cache
 */
declare module 'flat-cache' {
	export interface Cache {
		getKey(key: string): unknown;
		setKey(key: string, value: unknown): void;
		removeKey(key: string): boolean;
		save(noPrune?: boolean): void;
		destroy(): void;
		all(): Record<string, unknown>;
		keys(): string[];
	}

	// Alias for backwards compatibility
	export type FlatCache = Cache;

	// Support both function signatures
	export function load(cacheId: string, cacheDir?: string): Cache;
	export function load(options: { cacheId: string; cacheDir?: string }): Cache;
	
	export function create(cacheId: string, cacheDir?: string): Cache;
	export function create(options: { cacheId: string; cacheDir?: string }): Cache;
	
	export function clearAll(cacheDir?: string): void;
	export function clearCacheById(cacheId: string, cacheDir?: string): void;
}

