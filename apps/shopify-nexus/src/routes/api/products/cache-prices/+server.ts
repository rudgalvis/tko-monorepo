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

const nexusApi = new NexusApi()

const getVariantIds = async (): Promise<DataWithMeta<string[]>> => {
    const CACHE_KEY = 'availableVariantIds'
    const cache = new FlatCache({ ttl: 24 * 60 * 60 * 1000, cacheId: 'cache-prices' })
    cache.load()

    const cached = cache.getKey(CACHE_KEY)

    if (cached) return { meta: { cached: true }, data: cached }

    // Fetch
    const storefrontApi = new StorefrontApi()

    const variantIds = await storefrontApi.getAllAvailableVariantIds(100)

    cache.setKey(CACHE_KEY, variantIds)
    cache.save(true)

    return { meta: { cached: false }, data: variantIds }
}

const getLastRequest = (): DataWithMeta<number> => {
    const CACHE_KEY = 'lastCacheRequest'
    const cache = new FlatCache({ cacheId: 'cache-prices' })
    cache.load()

    const cached = cache.getKey(CACHE_KEY)

    if (cached) return { meta: { cached: true }, data: cached }

    const timestamp = Date.now()

    cache.setKey(CACHE_KEY, timestamp)
    cache.save(true)

    return { meta: { cached: false }, data: timestamp }
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

    const set = (value: CacheMeta | undefined) => {
        cache.setKey(CACHE_KEY, value)
        cache.save()
    }

    const reset = () => {
        cache.setKey(CACHE_KEY, { currentItem: 0, totalItems: 0, success: 0, failed: 0 })
        cache.save()
    }

    const addSuccess = (currentItem: number, length: number) => {
        const meta = get() || { currentItem: 0, totalItems: 0, success: 0, failed: 0 }
        meta.currentItem = currentItem + 1
        meta.totalItems = length
        meta.success++
        set(meta)
    }

    const addFailed = (currentItem: number, length: number) => {
        const meta = get() || { currentItem: 0, totalItems: 0, success: 0, failed: 0 }
        meta.currentItem = currentItem + 1
        meta.totalItems = length
        meta.failed++
        set(meta)
    }

    return {
        get,
        addSuccess,
        addFailed,
        reset
    }
}


const doCaching = async ({market, variantId}: {market: string, variantId: string}, index: number, length: number) => {
    if(controllProcess().isStopped()) return

    try{
        const r = await nexusApi.getVariantAutomaticDiscount(market, +variantId)

        if(r) {
            cachingMeta().addSuccess(index, length)

            return
        }
    } catch  {/* EMPTY */}

    cachingMeta().addFailed(index, length)
}



export const GET: RequestHandler = async () => {
    // Do not run if already in progres
    const cmeta = cachingMeta().get()
    if(cmeta && cmeta.currentItem !== cmeta.totalItems) {
        return new Response('Cache in progress')
    }

    const MIN_DELAY = 1000 * 60 * 60
    const { data: lastRequest = 0 } = await getLastRequest()
    const elapsed = Math.abs(Date.now() - lastRequest)

    if (elapsed < MIN_DELAY && false) return new Response('Throttling', { status: 400 })

    const { data: variantIds } = await getVariantIds()

    if (!variantIds) return json(null)

    const markets = [
        'US',
        'GB',
        'LT',
        'CA',
        'AU',
        //        'DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT', 'PT', 'IE', 'FI', 'GR', 'PL', 'CZ', 'HU', 'RO', 'BG', 'HR', 'SI', 'SK', 'EE', 'LV', 'DK', 'SE', 'NO', 'CH', 'IS',
        //        'NZ', 'JP', 'KR', 'CN', 'HK', 'SG', 'IN', 'TH', 'MY', 'ID', 'PH', 'VN',
        //        'BR', 'AR', 'CL', 'ZA', 'IL', 'TR'
    ]

    // Calculations
    // 500 variants
    // 50 markets
    // => 28000 requests
    // Doing 4 request per second will take 2h
    // For first 5 markets, it would take 15 min

    //    const nexusApi = new NexusApi()

    const params: { market: string; variantId: string }[] = []

    markets.forEach(async (market) => {
        variantIds.forEach(async (variantId: string) => {
            const numPart = variantId.split('/').pop()

            if (!numPart) return

            params.push({ market, variantId: numPart })
        })
    })

    const startCaching = async () => {
        let index = 0
        while (index < params.length) {
            if(controllProcess().isStopped()) {
                cachingMeta().reset()

                break;
            }

            console.log(`Cashing ${index}/${params.length}`)

            await doCaching(params[index], index, params.length)
            index ++
        }
    }

    startCaching()

    if(controllProcess().isStopped()) {
        return new Response('Cache stopped')
    }

    // Do the fetches

    // Check for last run not to be run more often than once per day

    //    // We pass it thourgh API config to hit cache or load balancers
    //    const nexusApi = new NexusApi()
    //
    //    if(!variantIds) return json(null)

    //    const storefrontApi = new StorefrontApi()

    return new Response('Caching started')
}
