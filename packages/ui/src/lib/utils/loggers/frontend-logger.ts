export const frontendLogger = {
    debug: (...args: unknown[]) => {
        console.log('[UI]', ...args);
    }
}
