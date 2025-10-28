import * as winston from 'winston';
import * as path from 'path';

/**
 * Logger configuration for price caching failures
 * Logs failed items to a file for debugging and analysis
 */

// Create logs directory path
const logsDir = path.join(process.cwd(), 'logs');

// Define log format
const logFormat = winston.format.combine(
	winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
	winston.format.errors({ stack: true }),
	winston.format.json()
);

// Create winston logger instance
export const failureLogger = winston.createLogger({
	level: 'error',
	format: logFormat,
	transports: [
		// File transport for failed items
		new winston.transports.File({
			filename: path.join(logsDir, 'failed-items.log'),
			maxsize: 10485760, // 10MB
			maxFiles: 5,
			tailable: true
		}),
		// Separate file for all errors (including exceptions)
		new winston.transports.File({
			filename: path.join(logsDir, 'error.log'),
			level: 'error',
			maxsize: 10485760, // 10MB
			maxFiles: 5,
			tailable: true
		})
	],
	// Handle uncaught exceptions
	exceptionHandlers: [
		new winston.transports.File({
			filename: path.join(logsDir, 'exceptions.log'),
			maxsize: 10485760, // 10MB
			maxFiles: 3
		})
	],
	// Handle unhandled promise rejections
	rejectionHandlers: [
		new winston.transports.File({
			filename: path.join(logsDir, 'rejections.log'),
			maxsize: 10485760, // 10MB
			maxFiles: 3
		})
	]
});

// Add console transport in development
if (process.env.NODE_ENV !== 'production') {
	failureLogger.add(
		new winston.transports.Console({
			format: winston.format.combine(winston.format.colorize(), winston.format.simple())
		})
	);
}

/**
 * Log a failed item from the processing queue
 */
export function logFailedItem(data: {
	product_id: string | number;
	market_id: string;
	error_message: string;
	timestamp: string;
	retry_count?: number;
	duration_ms?: number;
}): void {
	failureLogger.error('Failed to process item', {
		type: 'PROCESSING_FAILURE',
		...data
	});
}

/**
 * Log a batch of failed items
 */
export function logFailedItemsBatch(
	items: Array<{
		product_id: string | number;
		market_id: string;
		error_message: string;
		timestamp: string;
		retry_count?: number;
		duration_ms?: number;
	}>
): void {
	items.forEach((item) => logFailedItem(item));
	failureLogger.info(`Logged ${items.length} failed items in batch`);
}

/**
 * Log market completion summary with failures
 */
export function logMarketSummary(data: {
	market_id: string;
	total_products: number;
	completed: number;
	successful: number;
	failed: number;
	success_rate: number;
	failed_items: Array<{
		product_id: string | number;
		error_message: string;
		timestamp: string;
	}>;
}): void {
	if (data.failed > 0) {
		failureLogger.warn('Market processing completed with failures', {
			type: 'MARKET_SUMMARY',
			...data
		});
	}
}

