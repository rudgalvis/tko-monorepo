/**
 * State machine states for the caching process
 */
export enum ProcessStatus {
	IDLE = 'IDLE',
	INITIALIZING = 'INITIALIZING',
	PROCESSING = 'PROCESSING',
	PAUSED = 'PAUSED',
	COMPLETED = 'COMPLETED',
	ERROR = 'ERROR'
}

/**
 * Main process state - tracks the overall caching operation
 */
export interface ProcessState {
	status: ProcessStatus;
	current_market: string | null;
	current_product_idx: number;
	started_at: string | null;
	estimated_end_at: string | null;
	paused_at: string | null;
	completed_at: string | null;
	error_message: string | null;
	markets: string[];
	total_markets: number;
	current_market_index: number;
	market_totals: Record<string, number>; // Total products per market
}

/**
 * Per-market progress tracking
 */
export interface MarketProgress {
	market_id: string;
	total_products: number;
	completed: number;
	successful: number;
	failed: number;
	eta_minutes: number | null;
	started_at: string | null;
	completed_at: string | null;
	errors: ErrorLog[];
	avg_time_per_request_ms: number;
}

/**
 * Error log entry
 */
export interface ErrorLog {
	product_id: string;
	error_message: string;
	timestamp: string;
	retry_count: number;
}

/**
 * Overall analytics and statistics
 */
export interface Analytics {
	total_requests: number;
	total_success: number;
	total_fails: number;
	avg_time_per_request_ms: number;
	success_rate: number;
	markets: Record<
		string,
		{
			completed: number;
			successful: number;
			failed: number;
			success_rate: number;
		}
	>;
}

/**
 * Status response structure
 */
export interface StatusResponse {
	current_state: ProcessState;
	markets: Record<
		string,
		{
			completed: number;
			total: number;
			success_rate: number;
			failed: number;
			eta_minutes: number | null;
		}
	>;
	overall_progress: number;
	total_eta_minutes: number | null;
	analytics: Analytics;
}

/**
 * Product data structure
 */
export interface Variant {
	id: number;
	// Add other product fields as needed
}

/**
 * Market data structure
 */
export interface Market {
	id: string;
	name: string;
	// Add other market fields as needed
}

/**
 * Price fetch result
 */
export interface PriceFetchResult {
	product_id: string;
	market_id: string;
	success: boolean;
	duration_ms: number;
	error?: string;
	url?: string;
}

/**
 * Fetch log entry for tracking all fetch calls
 */
export interface FetchLogEntry {
	id: string;
	timestamp: string;
	url: string;
	product_id: string;
	market_id: string;
	success: boolean;
	duration_ms: number;
	error?: string;
	status_code?: number;
}

