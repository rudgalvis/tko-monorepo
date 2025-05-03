import type { PreorderNotificationResponse } from '$lib/mailing/MailingService'
import { OrderRepository } from '$lib/shopify/repositories/OrderRepository'
import type { OrderLineInventory } from '$lib/types/OrderLineInventory'
import type { ProductVariantIdentifier } from '$lib/utils/transformers/order/parse-order-webhook'

export type GeneratePreorderNoteInput = {
	preorderNotificationResponses: PreorderNotificationResponse[]
	itemsToPausePreorder: ProductVariantIdentifier[]
	orderId: number
	orderLineInventories: OrderLineInventory[]
}

export class OrderService {
	constructor(public orderRepository = new OrderRepository()) {}

	async addComment(orderId: number, comment: string) {
		const original = await this.orderRepository.readNote(orderId)

		const timestamp = `🕐 ${new Date().toLocaleString()}`
		const commentParts = [timestamp, comment, original].filter(Boolean)

		const formattedComment = commentParts.join('\n\n')

		return this.orderRepository.updateNote(orderId, formattedComment)
	}

	async generatePreorderNote({
		preorderNotificationResponses,
		itemsToPausePreorder,
		orderId,
		orderLineInventories,
	}: GeneratePreorderNoteInput) {
		const comment = [
			this.buildEmailNotificationsComment(preorderNotificationResponses),
			this.buildPreorderPauseComment(itemsToPausePreorder, orderLineInventories),
		]
			.filter(Boolean) // removes all falsy values
			.join('\n')

		return this.addComment(orderId, comment)
	}

	private buildEmailNotificationsComment(
		preorderNotificationResponses: PreorderNotificationResponse[]
	) {
		return preorderNotificationResponses.reduce((acc, { forItem, mailingStatus }) => {
			const messageId = mailingStatus.meta?.id
			const emailComment = [`✉️ Pre-order email sent to for ${forItem}`, messageId]
				.filter(Boolean)
				.join('\n')

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
