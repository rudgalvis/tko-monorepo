import { FlatCache } from 'flat-cache'

export class CacheStorageService {
    private readonly cache: FlatCache

    constructor(cacheId: string, ttl?: number) {
        this.cache = new FlatCache({ 
            cacheId,
            ttl: ttl || 0 // Default forever
        })
    }

    get<T>(key: string): T | undefined {
        this.cache.load()
        return this.cache.getKey(key) as T | undefined
    }

    set<T>(key: string, value: T): void {
        this.cache.load()
        this.cache.setKey(key, value)
    }

    save(prune?: boolean): void {
        this.cache.save(prune)
    }
}
