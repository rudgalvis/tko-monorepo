export const webhookSubscriptionDelete = `mutation webhookSubscriptionDelete($id: ID!) {
  webhookSubscriptionDelete(id: $id) {
    userErrors {
      field
      message
    }
    deletedWebhookSubscriptionId
  }
}`

export type WebhookSubscriptionDeleteResponse = {
	webhookSubscriptionDelete: {
		userErrors: Array<{
			field: string | null
			message: string
		}>
		deletedWebhookSubscriptionId: string | null
	}
}
