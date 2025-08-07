import fs from 'fs'

export enum WebhookType {
    ORDER_CREATE = 'order_create',
}

export const loadWebhookData = async <T>(webhookType: WebhookType): Promise<T> => {
    let filename: string | undefined

    switch (webhookType) {
        case WebhookType.ORDER_CREATE:
            filename = 'orders_create.json'
            break
        default:
            break
    }

    const data = fs.readFileSync(`./test-data/webhook-payload/${filename}`, {
        encoding: 'utf8',
    })

    return JSON.parse(data) as T
}
