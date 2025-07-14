import {
	MAIL_FROM_NAME,
	MAIL_REPLY_TO,
	MAILGUN_DOMAIN,
	MAILGUN_FROM_USER,
} from '$env/static/private'
import { Mailgun, type SendMailStatus } from '$lib/mailing/Mailgun'
import PreOrderEmailTemplate from '$lib/mailing/templates/PreOrderEmailTemplate.svelte'
import type { PreorderEmailAnalyzed } from '$lib/utils/transformers/order/parse-email-readiness-of-preorder'
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

	sendPreorderNotifications({
		preorderEmailsAnalyzed,
		customerName,
		orderId,
		customerEmail,
	}: {
		preorderEmailsAnalyzed: PreorderEmailAnalyzed[]
		customerName: string
		orderId: string
		customerEmail: string
	}): Promise<PreorderNotificationResponse>[] {
		return preorderEmailsAnalyzed
			.filter(({ ready }) => ready)
			.map(async ({ productTitle, estimatedShippingDate }) => {
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
