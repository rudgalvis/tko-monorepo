import { json } from '@sveltejs/kit'
import { FlatCache } from 'flat-cache'
import { StorefrontApi } from 'storefront-api'
import { NexusApi } from 'storefront-api'
import type { RequestHandler } from './$types'

type DataWithMeta<T> = {
    meta: {
        cached: boolean
    }
    data: T
}


const controllProcessCache = new FlatCache({cacheId: 'cache-prices' })
const controllProcess = () => {
    const CACHE_KEY = 'stop-processes'
    const cache = controllProcessCache
    cache.load()

    const stop = () => {
        cache.setKey(CACHE_KEY, true)
        cache.save()
    }

    const allow = () => {
        cache.setKey(CACHE_KEY, false)
        cache.save()
    }

    const isStopped = () => {
        return cache.getKey(CACHE_KEY) as boolean
    }

   return {
        stop,
       allow,
       isStopped,
   }
}


type CacheMeta = {
    currentItem: number
    totalItems: number
    success: number
    failed: number
}

const cachingMetaCache = new FlatCache({cacheId: 'cache-prices' })
const cachingMeta = () => {
    const CACHE_KEY = 'process-meta'
    const cache = cachingMetaCache
    cache.load()

    const get = (): CacheMeta | undefined => {
        return (cache.getKey(CACHE_KEY) as CacheMeta) || undefined
    }

    return {
        get,
    }
}


export const GET: RequestHandler = async ({url}) => {
    const meta = cachingMeta().get()
    const stop = url.searchParams.get('stop') === 'true'

    if(stop) {
        controllProcess().stop()

        setTimeout(() => {
            controllProcess().allow()
        } ,1000)
    }

    return json({
        cachingMeta: meta,
//        stopCall: stop,
//        isStopped: controllProcess().isStopped(),
        progress: meta ? Math.floor(meta.currentItem / meta.totalItems * 100) + '%' : 0 })
}


// https://factual-joey-sharp.ngrok-free.app/api/products/cache-prices
// https://factual-joey-sharp.ngrok-free.app/api/products/cache-meta
// https://factual-joey-sharp.ngrok-free.app/api/products/cache-meta?stop=true