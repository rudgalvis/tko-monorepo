import { FlatCache } from "flat-cache";

export class FileStorageService {
    public storage: FlatCache

    constructor(public cacheId: string, public ttl: number) {
        this.storage = new FlatCache({
            cacheId,
            ttl: this.ttl,
            persistInterval: 30000 // Auto-save to disk every 30 seconds
        })

        this.storage.load()
    }

    get<T>(key: string): T | undefined {
        return this.storage.getKey(key) as T | undefined
    }

    set<T>(key: string, value: T): void {
        this.storage.setKey(key, value)
        // No immediate save - persistInterval handles it
    }

    save(): void {
        this.storage.save()
    }

    clear(): void {
        this.storage.clear()
        this.storage.save()
    }
}