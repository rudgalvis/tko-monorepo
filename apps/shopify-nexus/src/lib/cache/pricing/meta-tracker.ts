import { CacheStorageService } from '../../services/cache-storage.service'
import type { CacheMeta } from './types'

export class MetaTracker {
    private readonly processMetaKey = 'process-meta'

    constructor(private readonly storage: CacheStorageService) {}

    get(): CacheMeta | undefined {
        return this.storage.get<CacheMeta>(this.processMetaKey) || undefined
    }

    set(value: CacheMeta | undefined): void {
        this.storage.set(this.processMetaKey, value)
        this.storage.save()
    }

    reset(): void {
        this.set({ currentItem: 0, totalItems: 0, success: 0, failed: 0 })
    }

    addSuccess(currentItem: number, length: number): void {
        const meta = this.get() || { currentItem: 0, totalItems: 0, success: 0, failed: 0 }
        meta.currentItem = currentItem + 1
        meta.totalItems = length
        meta.success++
        this.set(meta)
    }

    addFailed(currentItem: number, length: number): void {
        const meta = this.get() || { currentItem: 0, totalItems: 0, success: 0, failed: 0 }
        meta.currentItem = currentItem + 1
        meta.totalItems = length
        meta.failed++
        this.set(meta)
    }
}
