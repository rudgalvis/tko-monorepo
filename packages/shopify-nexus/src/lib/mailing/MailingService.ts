import {
	MAILGUN_DOMAIN,
	MAIL_REPLY_TO,
	MAILGUN_FROM_USER,
	MAIL_FROM_NAME,
} from '$env/static/private'
import { Mailgun, type SendMailStatus } from '$lib/mailing/Mailgun'
import PreOrderEmailTemplate from '$lib/mailing/templates/PreOrderEmailTemplate.svelte'
import type { OrderLineInventoryAnalyzed } from '$lib/types/OrderLineInventoryAnalyzed'
import { render } from 'svelte/server'

export type PreorderMailItem = {
	customerName: string
	productTitle: string
	orderId: string
	estimatedShippingDate?: string
}

export type PreorderNotificationResponse = {
	mailingStatus: SendMailStatus
	forItem: string
}

export class MailingService {
	private readonly FROM = `${MAIL_FROM_NAME} <${MAILGUN_FROM_USER}@${MAILGUN_DOMAIN}>`

	constructor(private mailer = new Mailgun()) {}

	async sendSingleItemPreorderMail(
		email: string,
		{
			customerName,
			productTitle,
			orderId,
			estimatedShippingDate = 'yet to be determined',
		}: PreorderMailItem
	) {
		// Adjusting for better email readability.
		// "Delčia: Lemon Cotton Sweater" -> "Delčia Lemon Cotton Sweater"
		productTitle = productTitle.replaceAll(':', '')

		const { body } = render(PreOrderEmailTemplate, {
			props: { customerName, productTitle, orderId, estimatedShippingDate },
		})

		return await this.mailer.sendMail({
			html: body,
			from: this.FROM,
			to: [email],
			subject: 'Thank you for your pre-order – here’s your shipping update',
			replyTo: MAIL_REPLY_TO,
			tag: 'preorder',
		})
	}

	parseEmailReadyPreorders(orderLineInventoriesAnalyzed: OrderLineInventoryAnalyzed[]) {
		const preorderItems = orderLineInventoriesAnalyzed.filter((item) => item.preOrders > 0)

		const uniquePreorderProducts = [...new Set(preorderItems.map(({ title }) => title))]

		return uniquePreorderProducts
			.map((productTitle) => {
				const item = preorderItems.find(({ title }) => title === productTitle)

				if (!item) return undefined
				if (!item.expectedDate.value) {
					console.error(
						`Expected date for ${productTitle} is not set. Preorder email will not be sent`
					)
					return undefined
				}

				return {
					productTitle,
					estimatedShippingDate: item.expectedDate.value,
				}
			})
			.filter((e) => !!e)
	}

	sendPreorderNotifications({
		orderLineInventoriesAnalyzed,
		customerName,
		orderId,
		customerEmail,
	}: {
		orderLineInventoriesAnalyzed: OrderLineInventoryAnalyzed[]
		customerName: string
		orderId: string
		customerEmail: string
	}): Promise<PreorderNotificationResponse>[] {
		const emailReadyPreorders = this.parseEmailReadyPreorders(orderLineInventoriesAnalyzed)

		return emailReadyPreorders.map(async ({ productTitle, estimatedShippingDate }) => {
			return {
				mailingStatus: await this.sendSingleItemPreorderMail(customerEmail, {
					customerName,
					productTitle,
					orderId,
					estimatedShippingDate,
				}),
				forItem: productTitle,
			}
		})
	}
}
