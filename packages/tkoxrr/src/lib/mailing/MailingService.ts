import { MAIL_FROM_EMAIL } from '$env/static/private'
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
	private readonly FROM = `The Knotty Ones <${MAIL_FROM_EMAIL}>`

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
			subject: 'Items Preordered',
			replyTo: 'hello@theknottyones.com',
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
