import { MAIL_FROM_EMAIL, MAIL_FROM_NAME } from '$env/static/private';
import { Mailgun } from '$lib/mailing/Mailgun';
import { test } from 'vitest';

test('Mailgun service', async () => {
	const mailgun = new Mailgun();

	try {
		const r = await mailgun.sendMail({
			from: `${MAIL_FROM_NAME} <${MAIL_FROM_EMAIL}>`,
			to: ['rokasr788@gmail.com', 'rokas@rudgalvis.com'],
			subject: 'Test',
			html: 'Test'
		});

		console.log(r);
	} catch (error) {
		console.log(error);
	}
});
