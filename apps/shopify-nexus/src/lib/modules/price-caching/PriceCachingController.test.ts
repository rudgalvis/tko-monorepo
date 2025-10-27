import { test } from "vitest"
import { PriceCachingController } from "./PriceCachingController"

test('PriceCachingController', async () => {
    const controller = new PriceCachingController()

    await controller.initialize()
    await controller.startCaching()
})

test('PriceCachingController status', async () => {
    const controller = new PriceCachingController()

    await controller.initialize()
    const status = await controller.getStatus()

    console.log(status)
})

test('PriceCachingController reset', async () => {
    const controller = new PriceCachingController()

    await controller.fullReset()
})