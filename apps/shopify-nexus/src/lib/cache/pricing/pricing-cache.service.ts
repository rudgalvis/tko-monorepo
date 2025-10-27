import { NexusApi } from 'storefront-api'
import { CacheStorageService } from '../../services/cache-storage.service'
import { CacheManager } from './cache-manager'
import { ProcessController } from './process-controller'
import { MetaTracker } from './meta-tracker'
import type { CacheMeta } from './types'

/**
 * Service responsible for caching pricing data for different markets and product variants.
 * Handles throttling, progress tracking, and process control for large-scale caching operations.
 */
export class PricingCacheService {
    // Configuration constants
    private static readonly CACHE_TTL_MS = 24 * 60 * 60 * 1000 // 24 hours
    private static readonly THROTTLE_DELAY_MS = 60 * 60 * 1000 // 1 hour minimum delay between cache operations
    private static readonly AUTO_ALLOW_DELAY_MS = 1000 // 1 second delay before auto-allowing after stop
    
    // Currently active markets for pricing cache
    private static readonly ACTIVE_MARKETS = [
        // North America
        'US', 'CA',
        // Europe
        'GB', 'LT',
        // Asia Pacific
        'AU'
        // Commented out markets for future expansion:
        // Europe: 'DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT', 'PT', 'IE', 'FI', 'GR', 'PL', 'CZ', 'HU', 'RO', 'BG', 'HR', 'SI', 'SK', 'EE', 'LV', 'DK', 'SE', 'NO', 'CH', 'IS'
        // Asia Pacific: 'NZ', 'JP', 'KR', 'CN', 'HK', 'SG', 'IN', 'TH', 'MY', 'ID', 'PH', 'VN'
        // Other regions: 'BR', 'AR', 'CL', 'ZA', 'IL', 'TR'
    ] as const

    private readonly nexusApi = new NexusApi()
    private readonly storage = new CacheStorageService('cache-prices', PricingCacheService.CACHE_TTL_MS)
    private readonly cacheManager = new CacheManager(this.storage)
    private readonly processController = new ProcessController(this.storage)
    private readonly metaTracker = new MetaTracker(this.storage)

    /**
     * Retrieves current caching metadata and progress information.
     * @returns Object containing caching metadata and progress percentage
     */
    async getCacheMeta(): Promise<{
        cachingMeta: CacheMeta | undefined
        progress: string
        isStopped: boolean
    }> {
        const currentMeta = this.metaTracker.get()
        const progressPercentage = this.calculateProgressPercentage(currentMeta)
        
        return {
            cachingMeta: currentMeta,
            progress: progressPercentage,
            isStopped: this.processController.isStopped()
        }
    }

    /**
     * Stops the current caching process and automatically re-enables it after a short delay.
     * This prevents immediate restart attempts while allowing the process to resume.
     */
    async stopCaching(): Promise<void> {
        this.processController.stop()
        
        // Auto-allow after configured delay to prevent immediate restart attempts
        setTimeout(() => {
            
            this.processController.allow()
        }, PricingCacheService.AUTO_ALLOW_DELAY_MS)
    }

    /**
     * Caches pricing data for a specific market and variant combination.
     * @param marketVariantPair - Object containing market and variant ID
     * @param currentIndex - Current position in the processing queue
     * @param totalItems - Total number of items to process
     */
    private async cacheVariantDiscount(
        { market, variantId }: { market: string, variantId: string }, 
        currentIndex: number, 
        totalItems: number
    ): Promise<void> {
        if (this.processController.isStopped()) return

        try {
            const discountResult = await this.nexusApi.getVariantAutomaticDiscount(market, +variantId)

            if (discountResult) {
                this.metaTracker.addSuccess(currentIndex, totalItems)
                return
            }
        } catch (error) {
            // Log error for debugging while still tracking as failed
            console.warn(`Failed to cache discount for market ${market}, variant ${variantId}:`, error)
        }

        this.metaTracker.addFailed(currentIndex, totalItems)
    }

    /**
     * Initiates the pricing cache process for all active markets and available variants.
     * Validates prerequisites, builds request parameters, and starts the caching process.
     * @returns Promise resolving to success status and message
     */
    async startCaching(): Promise<{ success: boolean; message: string }> {
        // Validate that caching can proceed
        const validationResult = this.validateCachingRequest()
        if (!validationResult.canProceed) {
            return { success: false, message: validationResult.reason || 'Unknown validation error' }
        }

        // Check throttling to prevent too frequent cache operations
        const throttlingResult = this.checkThrottling()
        if (!throttlingResult.allowed) {
            return { success: false, message: throttlingResult.reason || 'Unknown throttling error' }
        }

        // Get available variant IDs
        const { data: variantIds } = await this.cacheManager.getVariantIds()
        if (!variantIds) {
            return { success: false, message: 'No variant IDs available' }
        }

        // Build cache requests for all market/variant combinations
        const cacheRequests = this.buildCacheRequests(variantIds)

        // Start the caching process
        this.startCachingProcess(cacheRequests)

        return { success: true, message: 'Caching started' }
    }

    /**
     * Processes the caching queue by iterating through all market/variant combinations.
     * @param cacheRequests - Array of market/variant pairs to process
     */
    private async startCachingProcess(cacheRequests: { market: string; variantId: string }[]): Promise<void> {
        let currentIndex = 0
        
        while (currentIndex < cacheRequests.length) {
            if (this.processController.isStopped()) {
                this.metaTracker.reset()
                break
            }

            this.logProgress(currentIndex, cacheRequests.length)
            await this.cacheVariantDiscount(cacheRequests[currentIndex], currentIndex, cacheRequests.length)
            currentIndex++
        }
    }

    /**
     * Validates whether a new caching process can be started.
     * @returns Object indicating if caching can proceed and reason if not
     */
    private validateCachingRequest(): { canProceed: boolean; reason?: string } {
        const currentMeta = this.metaTracker.get()
        
        // Check if caching is already in progress
        if (currentMeta && currentMeta.currentItem !== currentMeta.totalItems) {
            return { canProceed: false, reason: 'Cache in progress' }
        }

        return { canProceed: true }
    }

    /**
     * Checks if enough time has passed since the last cache operation to allow a new one.
     * @returns Object indicating if throttling allows the operation and reason if not
     */
    private checkThrottling(): { allowed: boolean; reason?: string } {
        const { data: lastRequestTimestamp = 0 } = this.cacheManager.getLastRequest()
        const timeSinceLastRequest = Math.abs(Date.now() - lastRequestTimestamp)

        if (timeSinceLastRequest < PricingCacheService.THROTTLE_DELAY_MS) {
            return { allowed: false, reason: 'Throttling' }
        }

        return { allowed: true }
    }

    /**
     * Builds an array of cache requests by combining all active markets with all variant IDs.
     * @param variantIds - Array of variant ID strings
     * @returns Array of market/variant pairs for caching
     */
    private buildCacheRequests(variantIds: string[]): { market: string; variantId: string }[] {
        const cacheRequests: { market: string; variantId: string }[] = []
        
        PricingCacheService.ACTIVE_MARKETS.forEach((market) => {
            variantIds.forEach((variantId: string) => {
                const numericVariantId = this.extractNumericVariantId(variantId)
                if (numericVariantId) {
                    cacheRequests.push({ market, variantId: numericVariantId })
                }
            })
        })

        return cacheRequests
    }

    /**
     * Extracts the numeric part from a variant ID string.
     * @param variantId - Full variant ID string (e.g., "gid://shopify/ProductVariant/123456")
     * @returns Numeric variant ID or null if extraction fails
     */
    private extractNumericVariantId(variantId: string): string | null {
        const numericPart = variantId.split('/').pop()
        return numericPart || null
    }

    /**
     * Calculates the progress percentage based on current metadata.
     * @param meta - Current caching metadata
     * @returns Progress percentage as a string
     */
    private calculateProgressPercentage(meta: CacheMeta | undefined): string {
        if (!meta || meta.totalItems === 0) {
            return '0%'
        }
        
        const percentage = Math.floor((meta.currentItem / meta.totalItems) * 100)
        return `${percentage}%`
    }

    /**
     * Logs the current progress of the caching operation.
     * @param currentIndex - Current position in the processing queue
     * @param totalItems - Total number of items to process
     */
    private logProgress(currentIndex: number, totalItems: number): void {
        console.log(`Caching ${currentIndex}/${totalItems}`)
    }
}
