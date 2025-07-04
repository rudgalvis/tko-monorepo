import { timedLog } from '$lib/utils/loggers/timed-log'

export const logger = {
	info: (message: string, ...args: any[]) => timedLog(message, 'color: #2563eb; font-weight: bold;',...args),
	warn: (message: string, ...args: any[]) => timedLog(message, 'color: #d97706; font-weight: bold;', ...args),
	error: (message: string, ...args: any[]) => timedLog(message, 'color: #dc2626; font-weight: bold;',...args),
	success: (message: string, ...args: any[]) => timedLog(message, 'color: #059669; font-weight: bold;',...args),
}
