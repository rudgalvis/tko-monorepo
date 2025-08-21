# ShopifyNexus

Central connection point for various Shopify operations


Shopify CRM has to have metafields set up:
1. `custom.estimated_pre_order_shipping_date`
2. `custom.pre_order_limit`

![img.png](static/docs/img.png)


## Webhook Testing

### Setup
1. **Configure environment**: Edit `.env.test.local` and set `PUBLIC_NEXUS_BASE_URL` to your ngrok URL
2. **Start servers**:
   ```bash
   npm run dev          # Local development server
   npm run dev:exposed  # Ngrok-exposed server
   ```

### Testing Process
1. **Run the test**: Go to `src/lib/shopify/services/WebhookService.test.ts` and run `Testing webhooks with ORDERS_CREATE`
2. **What happens**:
    - Deletes existing `orders/create` webhook from production
    - Creates new webhook pointing to your local machine
3. **Test your changes**: The webhook will now trigger your local code
4. **Cleanup**:
    - Update `.env` to point back to production
    - Run the test again to restore production webhook

### Alternative Testing
For offline testing, use `server.test.ts` with the stored webhook payload in `test-data/webhook-payload/orders_create.json`

⚠️ **Important**: Always restore the production webhook after testing to avoid missing real orders.
