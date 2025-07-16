import crypto from 'crypto'

export const verifyWebhook = (
	rawBody: string,
	hmacHeader: string | null,
	secret: string | undefined
): boolean => {
	if (!hmacHeader || !secret) return false

	const hash = crypto.createHmac('sha256', secret).update(rawBody).digest('base64')

	return hash === hmacHeader
}