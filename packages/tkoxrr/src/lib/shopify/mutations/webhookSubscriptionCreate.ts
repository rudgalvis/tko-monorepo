export const webhookSubscriptionCreate = `
mutation webhookSubscriptionCreate($topic: WebhookSubscriptionTopic!, $webhookSubscription: WebhookSubscriptionInput!) {
  webhookSubscriptionCreate(topic: $topic, webhookSubscription: $webhookSubscription) {
    webhookSubscription {
      id
      topic
      filter
      format
      endpoint {
        __typename
        ... on WebhookHttpEndpoint {
          callbackUrl
        }
      }
    }
    userErrors {
      field
      message
    }
  }
}`

export type WebhookSubscriptionCreateInput = {
	topic: string
	webhookSubscription: {
		format: string
		callbackUrl: string
	}
}

export type WebhookSubscription = {
	id: string
	topic: string
	filter: string
	format: string
}

export type WebhookSubscriptionCreateResponse = {
	webhookSubscriptionCreate: {
		webhookSubscription: WebhookSubscription
		userErrors: any[]
	}
}
