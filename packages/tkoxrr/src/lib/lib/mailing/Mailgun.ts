import { MAILGUN_API_KEY, MAILGUN_DOMAIN } from '$env/static/private'
import FormData from 'form-data'
import _Mailgun from 'mailgun.js'
//@ts-ignore
import type { IMailgunClient } from 'mailgun.js/Types/Interfaces'

type SendMailOptions = {
	to: string[]
	from: string
	subject: string
	html: string
	replyTo?: string
	tag?: string
}

export type SendMailStatus = {
	success: boolean
	meta?: {
		id: string
		message: string
	}
}

export class Mailgun {
	private mailer: IMailgunClient

	constructor() {
		const mailgun = new _Mailgun(FormData)
		this.mailer = mailgun.client({
			username: 'api',
			key: MAILGUN_API_KEY,
		})
	}

	async sendMail({
		from,
		to,
		subject,
		html,
		replyTo,
		tag,
	}: SendMailOptions): Promise<SendMailStatus> {
		try {
			const { status, ...rest } = await this.mailer.messages.create(MAILGUN_DOMAIN, {
				from,
				to,
				subject,
				html,
				'o:tag': tag,
				'h:Reply-To': replyTo,
			})

			if (status === 200) {
				return {
					success: true,
					meta: {
						...rest,
					},
				}
			}

			console.log('Non 200 status returned when sending email.', { status, ...rest })

			return {
				success: false,
			}
		} catch (e) {
			console.log(e)

			throw new Error('Failed to send email')
		}
	}
}
