import { create, type FlatCache } from 'flat-cache';
import type { FetchLogEntry } from './types';
import * as path from 'path';
import * as fs from 'fs';

/**
 * FetchLogService manages fetch call logs using flat-cache
 * Uses a single log file that is cleaned on reset or successful completion
 */
export class FetchLogService {
	private logsCache: FlatCache;
	private cacheDir: string;
	private cacheId: string = 'fetch-logs'; // Single cache file
	private maxLogsPerRun: number = 10000; // Limit to prevent memory issues

	constructor(cacheDir: string = '.cache') {
		this.cacheDir = cacheDir;
		this.logsCache = create({ cacheId: this.cacheId, cacheDir });
		this.ensureInitialized();
	}

	/**
	 * Ensure the cache is initialized (create if doesn't exist)
	 */
	private ensureInitialized(): void {
		// Only initialize if logs don't exist
		if (!this.logsCache.getKey('logs')) {
			this.logsCache.setKey('started_at', new Date().toISOString());
			this.logsCache.setKey('logs', []);
			this.logsCache.save(true);
		}
	}

	/**
	 * Log a fetch call
	 */
	logFetch(entry: Omit<FetchLogEntry, 'id' | 'timestamp'>): void {
		const logs = this.getLogs();

		// Prevent memory issues by limiting log count
		if (logs.length >= this.maxLogsPerRun) {
			// Keep only the most recent logs
			logs.splice(0, 100); // Remove oldest 100 logs
		}

		const logEntry: FetchLogEntry = {
			...entry,
			id: this.generateLogId(),
			timestamp: new Date().toISOString()
		};

		// Console log before writing to cache
		const statusSymbol = logEntry.success ? '✓' : '✗';
		const statusColor = logEntry.success ? '\x1b[32m' : '\x1b[31m'; // Green or Red
		const resetColor = '\x1b[0m';
		
		console.log(
			`${statusColor}${statusSymbol}${resetColor} [${logEntry.market_id}] ${logEntry.product_id} - ` +
			`${logEntry.duration_ms}ms` +
			(logEntry.error ? ` - Error: ${logEntry.error}` : '')
		);

		logs.push(logEntry);
		this.logsCache.setKey('logs', logs);
		this.logsCache.save(true);
	}

	/**
	 * Generate a unique log ID
	 */
	private generateLogId(): string {
		return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
	}

	/**
	 * Get all logs for the current run (newest first)
	 */
	getLogs(limit?: number): FetchLogEntry[] {
		const logs: FetchLogEntry[] = (this.logsCache.getKey('logs') as FetchLogEntry[]) || [];
		
		// Return logs in reverse order (newest first)
		const reversedLogs = [...logs].reverse();
		
		if (limit) {
			return reversedLogs.slice(0, limit);
		}
		
		return reversedLogs;
	}

	/**
	 * Get logs with pagination
	 */
	getLogsPaginated(page: number = 1, pageSize: number = 50): {
		logs: FetchLogEntry[];
		total: number;
		page: number;
		pageSize: number;
		totalPages: number;
	} {
		const allLogs = this.getLogs();
		const total = allLogs.length;
		const totalPages = Math.ceil(total / pageSize);
		const startIdx = (page - 1) * pageSize;
		const endIdx = startIdx + pageSize;
		const logs = allLogs.slice(startIdx, endIdx);

		return {
			logs,
			total,
			page,
			pageSize,
			totalPages
		};
	}

	/**
	 * Get log statistics
	 */
	getStats(): {
		total: number;
		successful: number;
		failed: number;
		success_rate: number;
		avg_duration_ms: number;
	} {
		const logs = this.getLogs();
		const total = logs.length;
		const successful = logs.filter((log) => log.success).length;
		const failed = total - successful;
		const success_rate = total > 0 ? (successful / total) * 100 : 0;
		const avg_duration_ms =
			total > 0 ? logs.reduce((sum, log) => sum + log.duration_ms, 0) / total : 0;

		return {
			total,
			successful,
			failed,
			success_rate,
			avg_duration_ms
		};
	}

	/**
	 * Get run metadata
	 */
	getRunMetadata(): {
		started_at: string;
		total_logs: number;
	} {
		return {
			started_at: (this.logsCache.getKey('started_at') as string) || new Date().toISOString(),
			total_logs: this.getLogs().length
		};
	}

	/**
	 * Clear all logs and reset for a new run
	 * Called on reset or successful completion
	 */
	clearLogs(): void {
		this.logsCache.setKey('logs', []);
		this.logsCache.setKey('started_at', new Date().toISOString());
		this.logsCache.save(true);
	}

	/**
	 * Reset the log file completely (removes all data)
	 */
	reset(): void {
		this.clearLogs();
	}

	/**
	 * Check if log file exists
	 */
	exists(): boolean {
		const cachePath = path.join(this.cacheDir, this.cacheId);
		return fs.existsSync(cachePath);
	}

	/**
	 * Get the size of the log file in bytes
	 */
	getLogFileSize(): number {
		const cachePath = path.join(this.cacheDir, this.cacheId);
		if (fs.existsSync(cachePath)) {
			const stats = fs.statSync(cachePath);
			return stats.size;
		}
		return 0;
	}
}

