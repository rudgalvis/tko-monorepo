import type { RequestHandler } from './$types'
import { PriceCachingController } from '$lib/modules/price-caching/PriceCachingController'
import { json } from '@sveltejs/kit'

const controller = new PriceCachingController()

export const GET: RequestHandler = async () => {
    await controller.initialize()

    // Long running task
    controller.startCaching()

    const status = await controller.getStatus()

    return json(status)
}
