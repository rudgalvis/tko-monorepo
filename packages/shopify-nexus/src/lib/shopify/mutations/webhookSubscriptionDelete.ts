export const webhookSubscriptionDelete = `mutation webhookSubscriptionDelete($id: ID!) {
  webhookSubscriptionDelete(id: $id) {
    userErrors {
      field
      message
    }
    deletedWebhookSubscriptionId
  }
}`;
