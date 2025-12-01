import { MAIL_FROM_NAME, MAILGUN_DOMAIN, MAILGUN_FROM_USER } from '$env/static/private'
import { Mailgun } from '$lib/modules/mailing/Mailgun'
import { test } from 'vitest'

test('Mailgun service', async () => {
	const mailgun = new Mailgun()

	try {
		const r = await mailgun.sendMail({
			from: `${MAIL_FROM_NAME} <${MAILGUN_FROM_USER}@${MAILGUN_DOMAIN}>`,
			to: ['rokasr788@gmail.com', 'rokas@rudgalvis.com'],
			subject: 'Test',
			html: 'Test',
		})

		console.log(r)
	} catch (error) {
		console.log(error)
	}
})
