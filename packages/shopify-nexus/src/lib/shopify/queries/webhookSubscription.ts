export const webhookSubscription = `query {
  webhookSubscriptions(first: 10) {
    edges {
      node {
        id
        topic
        endpoint {
          __typename
          ... on WebhookHttpEndpoint {
            callbackUrl
          }
          ... on WebhookEventBridgeEndpoint {
            arn
          }
          ... on WebhookPubSubEndpoint {
            pubSubProject
            pubSubTopic
          }
        }
      }
    }
  }
}`;

export type WebhookNode = {
	id: string; // Or number, depending on your GraphQL schema
	topic: string;
	endpoint: {
		__typename: 'WebhookHttpEndpoint' | 'WebhookEventBridgeEndpoint' | 'WebhookPubSubEndpoint';
		callbackUrl?: string; // Present if __typename is 'WebhookHttpEndpoint'
		arn?: string; // Present if __typename is 'WebhookEventBridgeEndpoint'
		pubSubProject?: string; // Present if __typename is 'WebhookPubSubEndpoint'
		pubSubTopic?: string; // Present if __typename is 'WebhookPubSubEndpoint'
	};
};

export type WebhookSubscriptionReturn = {
	webhookSubscriptions: {
		edges: Array<{
			node: WebhookNode
		}>;
	};
};
