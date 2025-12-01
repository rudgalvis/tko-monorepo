import winston from 'winston';
import path from 'path';

// Path to logs directory (relative to process working directory)
// This works in both dev and production builds
const logsDir = path.resolve(process.cwd(), 'logs');

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

// Create the winston logger instance
const winstonLogger = winston.createLogger({
	level: process.env.LOG_LEVEL || 'info',
	format: logFormat,
	defaultMeta: { service: 'shopify-nexus' },
	transports: [
		// Write all logs to combined.log
		new winston.transports.File({
			filename: path.join(logsDir, 'combined.log'),
			maxsize: 5242880, // 5MB
			maxFiles: 5,
		}),
		// Write only errors to error.log
		new winston.transports.File({
			filename: path.join(logsDir, 'error.log'),
			level: 'error',
			maxsize: 5242880, // 5MB
			maxFiles: 5,
			format: winston.format.combine(
				winston.format((info) => {
					return info.level === 'error' ? info : false;
				})(),
				logFormat
			),
		}),
		// Write only warnings to warn.log
		new winston.transports.File({
			filename: path.join(logsDir, 'warn.log'),
			level: 'warn',
			maxsize: 5242880, // 5MB
			maxFiles: 5,
			format: winston.format.combine(
				winston.format((info) => {
					return info.level === 'warn' ? info : false;
				})(),
				logFormat
			),
		}),
		// Write only info messages to info.log
		new winston.transports.File({
			filename: path.join(logsDir, 'info.log'),
			level: 'info',
			maxsize: 5242880, // 5MB
			maxFiles: 5,
			format: winston.format.combine(
				winston.format((info) => {
					return info.level === 'info' ? info : false;
				})(),
				logFormat
			),
		}),
		// Write only debug messages to debug.log
		new winston.transports.File({
			filename: path.join(logsDir, 'debug.log'),
			level: 'debug',
			maxsize: 5242880, // 5MB
			maxFiles: 5,
			format: winston.format.combine(
				winston.format((info) => {
					return info.level === 'debug' ? info : false;
				})(),
				logFormat
			),
		}),
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