import type { NotificationProcessStatus } from '$lib/modules/mailing/MailingService'
import { OrderRepository } from '$lib/shopify/repositories/OrderRepository'
import type { OrderLineInventory } from '$lib/types/OrderLineInventory'
import type { ProductVariantIdentifier } from '$lib/utils/transformers/order/parse-order-webhook'
import { dev } from '$app/environment'


export type GeneratePreorderNoteInput = {
    notificationResponses: NotificationProcessStatus[]
    itemsToPausePreorder: ProductVariantIdentifier[]
    orderId: number
    orderLineInventories: OrderLineInventory[]
}

export class OrderService {
    constructor(public orderRepository = new OrderRepository()) {}

    async addComment(orderId: number, comment: string) {
        const original = await this.orderRepository.readNote(orderId)

        const timestamp = `🤖 RRXTO ${dev ? 'DEV' : ''} 🕐 ${new Date().toLocaleString('LT')}`
        const commentParts = [timestamp, comment, original].filter(Boolean)

        const formattedComment = commentParts.join('\n\n')

        return this.orderRepository.updateNote(orderId, formattedComment)
    }

    async generatePreorderNote({
        notificationResponses,
        itemsToPausePreorder,
        orderId,
        orderLineInventories,
    }: GeneratePreorderNoteInput) {
        const comment = [
            this.buildEmailNotificationsComment(notificationResponses),
            this.buildPreorderPauseComment(itemsToPausePreorder, orderLineInventories),
        ]
            .filter(Boolean) // removes all falsy values
            .join('\n')

        if (!comment) return

        return this.addComment(orderId, comment)
    }

    private buildEmailNotificationsComment(
        preorderNotificationResponses: NotificationProcessStatus[]
    ) {
        return preorderNotificationResponses.reduce((acc, { forItem, mailingStatus, group }) => {
            let contentLines: string[] = []

            switch (group) {
                case 'preorder':
                    contentLines = [
                        `✉️ Pre-order email sent for ${forItem} item.`,
                        mailingStatus.meta?.id ||
                            '❗️Mailing status ID not found. Contact developer.',
                    ]
                    break
                case 'handmade':
                    contentLines = [
                        `✉️Handmade email sent for ${forItem} item.`,
                        mailingStatus.meta?.id ||
                            '❗️Mailing status ID not found. Contact developer.',
                    ]
                    break
                case 'customization':
                    contentLines = [
                        `✉️ Customization email sent for this order.`,
                        mailingStatus.meta?.id ||
                            '❗️Mailing status ID not found. Contact developer.',
                    ]
                    break
            }

            const emailComment = contentLines.filter(Boolean).join('\n')

            return acc ? `${emailComment}\n${acc}` : emailComment
        }, '')
    }

    private buildPreorderPauseComment(
        itemsToPausePreorder: ProductVariantIdentifier[],
        orderLineInventories: OrderLineInventory[]
    ) {
        return itemsToPausePreorder
            .map((item) => {
                const details = orderLineInventories.find((e) => e.id === item.variantId)
                if (!details) return ''

                const {
                    title,
                    product: { title: productTitle },
                } = details
                return `🛑 Pre-order disabled for ${productTitle} - ${title}`
            })
            .filter(Boolean)
            .join('\n')
    }
}
