import { FileStorageService } from "$lib/services/FileStorageService"
import { NexusApi } from "storefront-api"

interface TaskControllerConfig {
    index: number
    market: string
    variantId: string
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

    private readonly options: TaskControllerConfig
    private readonly storage: FileStorageService
    private readonly nexusApi: NexusApi

    private readonly TIMEOUT_MS: number = 5000 // 5 seconds

    constructor(config: TaskControllerConfig) {
        if (!config.index) throw new Error('Index must be set')
        
        this.options = {
            index: config.index,
            market: config.market,
            variantId: config.variantId
        }
        
        this.storage = config.storage ?? new FileStorageService('task-controller', 3600)
        this.nexusApi = config.nexusApi ?? new NexusApi()
        
        this.loadDetails()
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
        switch(this._status) {
            case TaskStatus.RUNNING:
                if(this.isTimedout()) {
                    this.failTask()
                    return
                } else {
                    throw new Error('Task is already running')
                }
                break
            default:
                this._status = TaskStatus.RUNNING
                this._startedAt = Date.now()
                this.saveDetails()
                await this.action()
                break
        }
    }

    private async action(): Promise<void> {
        const controller = new AbortController()
        let taskCompleted = false
        
        const processTask = async () => {
            try {
                const discountResult = await this.nexusApi.getVariantAutomaticDiscount(this.options.market, +this.options.variantId, controller.signal)
            
                if (!taskCompleted) {
                    taskCompleted = true
                    if (discountResult) {
                        this.finishTask()
                    } else {
                        this.failTask()
                    }
                }
            } catch (error) {
                if (!taskCompleted) {
                    taskCompleted = true
                    if (error instanceof Error && error.name === 'AbortError') {
                        // Request was cancelled due to timeout, but task may already be failed by timeout
                        // Only fail if not already completed
                        this.failTask()
                    } else {
                        // Other error occurred, fail the task
                        this.failTask()
                    }
                }
            }
        }

        const timeout = new Promise<void>((resolve) => {
            setTimeout(() => {
                if (!taskCompleted) {
                    taskCompleted = true
                    controller.abort()
                    this.failTask()
                }
                resolve()
            }, this.TIMEOUT_MS)
        })

        await Promise.race([processTask(), timeout])
    }

    private finishTask() {
        this._status = TaskStatus.FINISHED
        this._finishedAt = Date.now()
        this.saveDetails()
    }

    private failTask() {
        this._status = TaskStatus.FAILED
        this._finishedAt = Date.now()
        this.saveDetails()
    }

    private isTimedout() {
        return this._startedAt && Date.now() - this._startedAt > this.TIMEOUT_MS
    }

    private loadDetails(): void {
        const details = this.storage.get<TaskDetails>(`task-${this.options.index}`)

        if(details) {
            this.options.market = details.market
            this.options.variantId = details.variantId
            this.options.index = details.index
            this._status = details.status
            this._startedAt = details.startedAt
            this._finishedAt = details.finishedAt
        }
    }

    private saveDetails() {
        void this.storage.set(`task-${this.options.index}`, this.details)
    }
}

export const createTaskController = (config: TaskControllerConfig) => {
    return new TaskController(config)
}