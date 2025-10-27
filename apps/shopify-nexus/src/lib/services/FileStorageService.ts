import { FlatCache } from "flat-cache";

export class FileStorageService {
    public storage: FlatCache

    constructor(public cacheId: string, public ttl: number) {
        this.storage = new FlatCache({
            cacheId,
            ttl: this.ttl
        })

        this.storage.load()
    }

    get<T>(key: string): T | undefined {
        this.storage.load()
        return this.storage.getKey(key) as T | undefined
    }

    set<T>(key: string, value: T): void {
        this.storage.load()
        this.storage.setKey(key, value)
        this.storage.save()
    }

    clear(): void {
        this.storage.clear()
        this.storage.save()
    }
}