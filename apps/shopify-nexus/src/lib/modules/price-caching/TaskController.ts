import { FileStorageService } from "$lib/services/FileStorageService"
import { NexusApi } from "storefront-api"

export type TaskParams = {
    index: number
    market: string
    variantId: string
}

export type TaskControllerConfig = TaskParams & {
    storage?: FileStorageService
    nexusApi?: NexusApi
}


export enum TaskStatus {
    RUNNING = 'running',
    FINISHED = 'finished',
    FAILED = 'failed'
}

type TaskDetails = {
    index: number
    market: string
    variantId: string
    status?: TaskStatus 
    startedAt?: number
    finishedAt?: number
}

export class TaskController {
    private _status: TaskStatus | undefined
    private _startedAt: number | undefined
    private _finishedAt: number | undefined

    private options: TaskControllerConfig

    public readonly storage: FileStorageService
    private readonly nexusApi: NexusApi

    private readonly TIMEOUT_MS: number = 5000 // 5 seconds

    constructor(config: TaskControllerConfig) {
        if (config.index === undefined || config.index === null) throw new Error('Index must be set')
        
        this.options = {
            index: config.index,
            market: config.market,
            variantId: config.variantId
        }
        
        this.storage = config.storage ?? new FileStorageService('task-controller', 3600 * 1000)
        this.nexusApi = config.nexusApi ?? new NexusApi()
        
        // Override from storage if it exists
        // this.loadDetails()
    }

    get details(): TaskDetails | undefined {
        return {
            index: this.options.index,
            status: this._status,
            market: this.options.market,
            variantId: this.options.variantId,
            startedAt: this._startedAt,
            finishedAt: this._finishedAt
        }
    }

    async run() {
        // Check if task is already running
        if (this._status === TaskStatus.RUNNING) {
            // First check if it's timed out
            if (!this.isTimedout()) {
                // If not timed out, it's genuinely still running
                throw new Error('Task is already running. Breaking this run off.')
            }

            // If timed out, fail the task
            this.failTask()
            return
        }
        
        // Task is not running, so start it
        this._status = TaskStatus.RUNNING
        this._startedAt = Date.now()
        await this.action()
    }

    private async action(): Promise<void> {
        const controller = new AbortController()
        let timeoutOccurred = false
        
        const taskPromise = new Promise<boolean>((resolve, reject) => {
            // Set up timeout that aborts and rejects
            const timeoutId = setTimeout(() => {
                timeoutOccurred = true
                controller.abort()
                reject(new Error('Task timeout'))
            }, this.TIMEOUT_MS)
            
            // Execute API call
            this.nexusApi.getVariantAutomaticDiscount(
                this.options.market, 
                +this.options.variantId, 
                controller.signal
            )
                .then((discountResult) => {
                    // Check if the request was aborted due to timeout
                    if (timeoutOccurred || controller.signal.aborted) {
                        reject(new Error('Task timeout'))
                        return
                    }
                    
                    if (discountResult) {
                       resolve(true)
                    } else {
                        reject(new Error('Failed to get variant automatic discount'))
                    }
                })
                .catch(error => {
                    // Handle API errors (including abort errors)
                    if (timeoutOccurred || controller.signal.aborted) {
                        reject(new Error('Task timeout'))
                    } else {
                        reject(error)
                    }
                })
                .finally(() => {
                    clearTimeout(timeoutId)
                })
        })
        
        // Handle completion
        try {
            const success = await taskPromise
            if (success) {
                this.finishTask() 
            } else {
                console.error('Failed to get variant automatic discount for market', this.options.market, 'variant', this.options.variantId)
                this.failTask()
            }
        } catch {
            this.failTask()
        }
    }

    private finishTask() {
        this._status = TaskStatus.FINISHED
        this._finishedAt = Date.now()
    }

    private failTask() {
        this._status = TaskStatus.FAILED
        this._finishedAt = Date.now()
    }

    private isTimedout() {
        return this._startedAt && Date.now() - this._startedAt > this.TIMEOUT_MS
    }

    loadFromData(data: TaskDetails): void {
        this.options.market = data.market
        this.options.variantId = data.variantId
        this.options.index = data.index
        this._status = data.status
        this._startedAt = data.startedAt
        this._finishedAt = data.finishedAt
    }

    private loadDetails(): void {
        const details = this.storage.get<TaskDetails>(`task-${this.options.index}`)

        if(details) {
            this.loadFromData(details)
        }
    }

    private saveDetails() {
        this.storage.set(`task-${this.options.index}`, this.details)
    }
}

export const createTaskController = (config: TaskControllerConfig) => {
    return new TaskController(config)
}