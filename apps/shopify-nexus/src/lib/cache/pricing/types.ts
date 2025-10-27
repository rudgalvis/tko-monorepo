export type DataWithMeta<T> = {
    meta: {
        cached: boolean
    }
    data: T
}

export type CacheMeta = {
    currentItem: number
    totalItems: number
    success: number
    failed: number
}
