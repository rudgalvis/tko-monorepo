import { StorefrontApi } from 'storefront-api'
import { CacheStorageService } from '../../services/cache-storage.service'
import type { DataWithMeta } from './types'

export class CacheManager {
    private readonly variantIdsKey = 'availableVariantIds'
    private readonly lastRequestKey = 'lastCacheRequest'

    constructor(private readonly storage: CacheStorageService) {}

    async getVariantIds(): Promise<DataWithMeta<string[]>> {
        const cached = this.storage.get<string[]>(this.variantIdsKey)

        if (cached) return { meta: { cached: true }, data: cached }

        // Fetch
        const storefrontApi = new StorefrontApi()
        const variantIds = await storefrontApi.getAllAvailableVariantIds(100)

        this.storage.set(this.variantIdsKey, variantIds)
        this.storage.save(true)

        return { meta: { cached: false }, data: variantIds }
    }

    getLastRequest(): DataWithMeta<number> {
        const cached = this.storage.get<number>(this.lastRequestKey)

        if (cached) return { meta: { cached: true }, data: cached }

        const timestamp = Date.now()

        this.storage.set(this.lastRequestKey, timestamp)
        this.storage.save(true)

        return { meta: { cached: false }, data: timestamp }
    }

    setLastRequest(timestamp: number = Date.now()): void {
        this.storage.set(this.lastRequestKey, timestamp)
        this.storage.save()
    }
}
