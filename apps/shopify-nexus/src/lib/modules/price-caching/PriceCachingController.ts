import { FileStorageService } from "$lib/services/FileStorageService"
import { NexusApi } from "storefront-api"
import { TaskController, TaskStatus } from "./TaskController"

export type PriceCachingControllerConfig = {
    storage?: FileStorageService
    nexusApi?: NexusApi
}

type ControllerDetails = {
    stopFlag: boolean
    initiatedAt: number | undefined
    completedAt: number | undefined
    index: number
}


export class PriceCachingController {
    private static readonly MARKETS_TO_CACHE = [
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

    private initiatedAt: number | undefined
    private completedAt: number | undefined
    private index: number = 0
    private stopFlag: boolean = false
    private tasks: TaskController[] = []

    private readonly storage: FileStorageService
    private readonly taskStorage: FileStorageService
    private readonly nexusApi: NexusApi
    
    constructor(config: PriceCachingControllerConfig = {storage: undefined, nexusApi: undefined}) {
        // Run task on init
        // Task itself will handle not being ran if running

        this.storage = config.storage ?? new FileStorageService('price-caching-controller', 0)
        this.taskStorage = new FileStorageService('task-controller', 0)
        this.nexusApi = config.nexusApi ?? new NexusApi()

        this.loadDetails()
    }

    async initialize() {
        // Load in all task ctonroller data from storage and create task controller with this single load
        console.log(this.taskStorage.storage.all())
        // await this.createTasks()
    }

    get details(): ControllerDetails | undefined {
        return {
            stopFlag: this.stopFlag,
            initiatedAt: this.initiatedAt,
            completedAt: this.completedAt,
            index: this.index,
        }
    }

    async startCaching() {
        this.stopFlag = false

        if(!this.initiatedAt) {
            this.initiatedAt = Date.now()
        }

        if(this.initiatedAt && !this.completedAt) {
            throw new Error('Caching already started')
        }

        this.saveDetails()

        await this.runNextTask()
    }

    async stopCaching() {
        this.stopFlag = true
        this.saveDetails()
    }

    async runNextTask(): Promise<void> {
        if(this.stopFlag) return

        try {
            await this.tasks[this.index].run()
        } catch (error) {
            console.error(error)
        }

        this.index++

        if(this.index >= this.tasks.length) {
            this.completedAt = Date.now()
            this.saveDetails()
            console.log('stopping because we have run all tasks')
        } else {
            this.saveDetails()
            console.log('running next task')
            
            return await this.runNextTask()
        }
    }

    async getStatus(): Promise<Record<string, unknown>> {

        // Read failed
        const failedTasks = this.tasks.slice(0, this.index).filter(task => task.details?.status === TaskStatus.FAILED).length
        const completedTasks = this.tasks.slice(0, this.index).filter(task => task.details?.status === TaskStatus.FINISHED).length

        const getDuration = () => {
            let ms = 0; 
            if(!this.completedAt && this.initiatedAt) {
                ms= Date.now() - this.initiatedAt
            } else if(this.completedAt && this.initiatedAt) {
                ms= this.completedAt - this.initiatedAt
            } 


            // COnvert to hh:mm:ss
            const hours = Math.floor(ms / (1000 * 60 * 60))
            const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((ms % (1000 * 60)) / 1000)

            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        }

        return {
            ...this.details,
            index: `${this.index} / ${this.tasks.length}`,
            initiatedAt: this.initiatedAt? (new Date(this.initiatedAt)).toISOString() : undefined,
            completedAt: this.completedAt? (new Date(this.completedAt)).toISOString() : undefined,
            progress: Math.floor((this.index / this.tasks.length) * 100) + '%',
            duration: getDuration(),
            failedTasks,
            completedTasks
        }
    }

    public fullReset() {
        this.stopFlag = false
        this.initiatedAt = undefined
        this.completedAt = undefined
        this.index = 0
        this.taskStorage.clear()
        this.storage.clear()
    }

    private async createTasks() {
        const variantIds = await this.nexusApi.getAvailableVariantIds()

        if(!variantIds) return []

        variantIds.forEach((variantId, index) => {
            PriceCachingController.MARKETS_TO_CACHE.forEach((market, marketIndex) => {
                this.tasks.push(new TaskController({
                    index: (index * PriceCachingController.MARKETS_TO_CACHE.length) + marketIndex,
                    market,
                    variantId,
                    storage: this.taskStorage
                }))
            })
        })
    }

    private loadDetails(): void {
        const details = this.storage.get<ControllerDetails>(`price-caching-controller`)

        if(details) {
            this.stopFlag = details.stopFlag
            this.initiatedAt = details.initiatedAt
            this.completedAt = details.completedAt
            this.index = details.index
        }
    }

    private saveDetails() {
        this.storage.set(`price-caching-controller`, this.details)
    }
}