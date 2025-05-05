import { MAILGUN_DOMAIN, MAIL_REPLY_TO, MAILGUN_FROM_USER, MAIL_FROM_NAME } from '$env/static/private'
import { Mailgun, type SendMailStatus } from '$lib/mailing/Mailgun'
import PreOrderEmailTemplate from '$lib/mailing/templates/PreOrderEmailTemplate.svelte'
import type { OrderLineInventoryAnalyzed } from '$lib/types/OrderLineInventoryAnalyzed'
import { render } from 'svelte/server'

export type PreorderMailItem = {
	customerName: string
	productTitle: string
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
		{ customerName, productTitle, estimatedShippingDate = 'yet to be determined' }: PreorderMailItem
	) {
		// Adjusting for better email readability.
		// "Delčia: Lemon Cotton Sweater" -> "Delčia Lemon Cotton Sweater"
		productTitle = productTitle.replaceAll(':', '')

		const { body } = render(PreOrderEmailTemplate, {
			props: { customerName, productTitle, estimatedShippingDate },
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

	sendPreorderNotifications({
		orderLineInventoriesAnalyzed,
		customerName,
		customerEmail,
	}: {
		orderLineInventoriesAnalyzed: OrderLineInventoryAnalyzed[]
		customerName: string
		customerEmail: string
	}): Promise<PreorderNotificationResponse>[] {
		const preorderItems = orderLineInventoriesAnalyzed.filter((item) => item.preOrders > 0)

		const uniquePreorderProducts = [...new Set(preorderItems.map(({ product }) => product.title))]

		return uniquePreorderProducts.map(async (productTitle) => {
			const item = preorderItems.find(({ product }) => product.title === productTitle)

			return {
				mailingStatus: await this.sendSingleItemPreorderMail(customerEmail, {
					customerName,
					productTitle,
					estimatedShippingDate: item?.expectedDate.value,
				}),
				forItem: productTitle,
			}
		})
	}
}
