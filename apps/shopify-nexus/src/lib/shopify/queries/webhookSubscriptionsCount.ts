export const webhookSubscriptionsCount = `query WebhookSubscriptionsCount($query: String!) {
  webhookSubscriptionsCount(query: $query) {
    count
    precision
  }
}`;
