import { CacheStorageService } from '../../services/cache-storage.service'

export class ProcessController {
    private readonly stopProcessKey = 'stop-processes'

    constructor(private readonly storage: CacheStorageService) {}

    stop(): void {
        this.storage.set(this.stopProcessKey, true)
        this.storage.save()
    }

    allow(): void {
        this.storage.set(this.stopProcessKey, false)
        this.storage.save()
    }

    isStopped(): boolean {
        return this.storage.get<boolean>(this.stopProcessKey) || false
    }
}
