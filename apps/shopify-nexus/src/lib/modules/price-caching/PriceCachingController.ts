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
    isRunning: boolean
    lastActivityAt: number | undefined
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
    private isRunning: boolean = false
    private lastActivityAt: number | undefined
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
        // Load in all task controller data from storage and create task controller with this single load
        const allTaskData = this.taskStorage.storage.all()
        console.log('Loaded task data:', allTaskData)
        
        // Create tasks with bulk-loaded data
        await this.createTasks()
    }

    get details(): ControllerDetails | undefined {
        return {
            stopFlag: this.stopFlag,
            initiatedAt: this.initiatedAt,
            completedAt: this.completedAt,
            index: this.index,
            isRunning: this.isRunning,
            lastActivityAt: this.lastActivityAt,
        }
    }

    async startCaching() {
        // If already running, check if we should recover from a stuck state
        if (this.isRunning) {
            const shouldRecover = this.shouldRecoverFromStuckState()
            
            if (!shouldRecover) {
                console.log('Caching already running, returning current status')
                return
            }
            
            console.log('Detected stuck state, recovering by resuming from next task')
            // Continue to resume execution
        }

        this.isRunning = true
        this.stopFlag = false
        this.lastActivityAt = Date.now()
        
        if(!this.initiatedAt) {
            this.initiatedAt = Date.now()
        }

        this.saveDetails()
        await this.runNextTask()
    }

    async stopCaching() {
        this.stopFlag = true
        this.isRunning = false
        this.saveDetails()
        this.taskStorage.save() // Force save on stop
        this.storage.save()
    }

    async runNextTask(): Promise<void> {
        if(this.stopFlag) {
            this.isRunning = false
            return
        }

        // Update last activity before running task
        this.lastActivityAt = Date.now()
        this.saveDetails()

        try {
            await this.tasks[this.index].run()
        } catch (error) {
            console.error(error)
        }

        this.index++

        if(this.index >= this.tasks.length) {
            this.completedAt = Date.now()
            this.isRunning = false
            this.saveDetails()
            this.taskStorage.save() // Force save on completion
            this.storage.save()
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

        const isStuck = this.isRunning && this.shouldRecoverFromStuckState()
        
        return {
            ...this.details,
            index: `${this.index} / ${this.tasks.length}`,
            initiatedAt: this.initiatedAt? (new Date(this.initiatedAt)).toISOString() : undefined,
            completedAt: this.completedAt? (new Date(this.completedAt)).toISOString() : undefined,
            progress: Math.floor((this.index / this.tasks.length) * 100) + '%',
            duration: getDuration(),
            failedTasks,
            completedTasks,
            isStuck
        }
    }

    public fullReset() {
        this.stopFlag = false
        this.initiatedAt = undefined
        this.completedAt = undefined
        this.index = 0
        this.isRunning = false
        this.lastActivityAt = undefined
        this.taskStorage.clear()
        this.storage.clear()
    }

    private async createTasks() {
        const variantIds = await this.nexusApi.getAvailableVariantIds()

        if(!variantIds) return []

        // Get all existing task data from storage in one operation
        const allTaskData = this.taskStorage.storage.all()

        variantIds.forEach((variantId, index) => {
            PriceCachingController.MARKETS_TO_CACHE.forEach((market, marketIndex) => {
                const taskIndex = (index * PriceCachingController.MARKETS_TO_CACHE.length) + marketIndex
                
                // Create task controller with pre-loaded data if it exists
                const taskController = new TaskController({
                    index: taskIndex,
                    market,
                    variantId,
                    storage: this.taskStorage
                })
                
                // Load existing task details if available
                const existingData = allTaskData[`task-${taskIndex}`]
                if (existingData) {
                    // Load the data using the proper method to avoid individual file reads
                    taskController.loadFromData(existingData)
                }
                
                this.tasks.push(taskController)
            })
        })
    }

    private shouldRecoverFromStuckState(): boolean {
        if (!this.lastActivityAt) {
            // No last activity recorded, allow recovery
            return true
        }
        
        const STUCK_THRESHOLD_MS = 30000 // 30 seconds (6x task timeout)
        const timeSinceLastActivity = Date.now() - this.lastActivityAt
        
        return timeSinceLastActivity > STUCK_THRESHOLD_MS
    }

    private loadDetails(): void {
        const details = this.storage.get<ControllerDetails>(`price-caching-controller`)

        if(details) {
            this.stopFlag = details.stopFlag
            this.initiatedAt = details.initiatedAt
            this.completedAt = details.completedAt
            this.index = details.index
            this.isRunning = details.isRunning ?? false
            this.lastActivityAt = details.lastActivityAt
        }
    }

    private saveDetails() {
        this.storage.set(`price-caching-controller`, this.details)
    }
}