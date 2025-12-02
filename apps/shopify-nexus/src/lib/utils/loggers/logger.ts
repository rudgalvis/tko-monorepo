import winston from 'winston';
import path from 'path';
import fs from 'fs';

// Path to logs directory (relative to process working directory)
// This works in both dev and production builds
const logsDir = path.resolve(process.cwd(), 'logs');

// Ensure logs directory exists
try {
	if (!fs.existsSync(logsDir)) {
		fs.mkdirSync(logsDir, { recursive: true });
	}
	// Verify directory is writable
	fs.accessSync(logsDir, fs.constants.W_OK);
} catch (error) {
	console.error('Failed to create or access logs directory:', error);
	console.error('Logs directory path:', logsDir);
	console.error('Current working directory:', process.cwd());
}

// Define log format
const logFormat = winston.format.combine(
	winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
	winston.format.errors({ stack: true }),
	winston.format.splat(),
	winston.format.json()
);

// Define console format for development (more readable)
const consoleFormat = winston.format.combine(
	winston.format.colorize(),
	winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
	winston.format.printf(({ timestamp, level, message, ...meta }) => {
		const metaString = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : '';
		return `${timestamp} [${level}]: ${message} ${metaString}`;
	})
);

// Create file transports with error handling
const createFileTransport = (filename: string, level: string, filterLevel: string) => {
	const transport = new winston.transports.File({
		filename: path.join(logsDir, filename),
		level,
		maxsize: 5242880, // 5MB
		maxFiles: 5,
		format: winston.format.combine(
			winston.format((info) => {
				const levelStr = String(info.level).toLowerCase();
				return levelStr === filterLevel ? info : false;
			})(),
			logFormat
		),
	});

	// Handle transport errors
	transport.on('error', (error) => {
		console.error(`Winston transport error for ${filename}:`, error);
	});

	return transport;
};

// Create the winston logger instance
const winstonLogger = winston.createLogger({
	level: process.env.LOG_LEVEL || 'info',
	format: logFormat,
	defaultMeta: { service: 'shopify-nexus' },
	transports: [
		// Write all logs to combined.log
		(() => {
			const transport = new winston.transports.File({
				filename: path.join(logsDir, 'combined.log'),
				maxsize: 5242880, // 5MB
				maxFiles: 5,
			});
			transport.on('error', (error) => {
				console.error('Winston transport error for combined.log:', error);
			});
			return transport;
		})(),
		// Write only errors to error.log
		createFileTransport('error.log', 'error', 'error'),
		// Write only warnings to warn.log (exclude errors)
		createFileTransport('warn.log', 'warn', 'warn'),
		// Write only info messages to info.log (exclude warn and error)
		createFileTransport('info.log', 'info', 'info'),
		// Write only debug messages to debug.log (exclude info, warn, error)
		createFileTransport('debug.log', 'debug', 'debug'),
	],
});

// Add console transport in development
if (process.env.NODE_ENV !== 'production') {
	winstonLogger.add(
		new winston.transports.Console({
			format: consoleFormat,
		})
	);
}

// Export winston logger instance for advanced usage
export const loggerInstance = winstonLogger;

// Export convenience methods that work like console.log
// Compatible with existing code that uses logger.info(), logger.warn(), etc.
export const logger = {
	debug: (message: string, ...args: unknown[]) => {
		if (args.length > 0) {
			winstonLogger.debug(message, ...args);
		} else {
			winstonLogger.debug(message);
		}
	},
	info: (message: string, ...args: unknown[]) => {
		if (args.length > 0) {
			winstonLogger.info(message, ...args);
		} else {
			winstonLogger.info(message);
		}
	},
	warn: (message: string, ...args: unknown[]) => {
		if (args.length > 0) {
			winstonLogger.warn(message, ...args);
		} else {
			winstonLogger.warn(message);
		}
	},
	error: (message: string, ...args: unknown[]) => {
		if (args.length > 0) {
			winstonLogger.error(message, ...args);
		} else {
			winstonLogger.error(message);
		}
	},
};

// Default export for convenience
export default logger;