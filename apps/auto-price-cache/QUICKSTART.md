# Quick Start Guide

## Setup

1. **Install Dependencies**
   ```bash
   cd apps/auto-price-cache
   pnpm install
   ```

2. **Start Development Server**
   ```bash
   pnpm dev
   ```

3. **Open Dashboard**
   Navigate to http://localhost:5173

## First Run

### Using the Dashboard

1. **Start Process**
   - Click "Start Process" button
   - Process will initialize and begin fetching prices
   - Progress updates automatically every 2 seconds

2. **Monitor Progress**
   - View overall progress percentage
   - Check individual market progress
   - See real-time ETA estimates
   - Monitor success rates

3. **Control Process**
   - **Stop**: Pause the process (can resume later)
   - **Resume**: Continue from where you stopped
   - **Reset**: Clear all cached data and start fresh

### Using the API

```bash
# Start the process
curl -X POST http://localhost:5173/api/cache/prices/start

# Get current status
curl http://localhost:5173/api/cache/prices/status

# Stop the process
curl -X POST http://localhost:5173/api/cache/prices/stop

# Reset everything
curl -X POST http://localhost:5173/api/cache/prices/reset
```

## Configuration

### Replace Mock Data Providers

Edit `src/lib/cache-instance.ts` and replace the mock functions:

```typescript
// Replace this mock function
async function getAvailableMarkets(): Promise<Market[]> {
    // TODO: Call your actual API
    const response = await fetch('https://your-api.com/markets');
    return response.json();
}

// Replace this mock function
async function getProductsForMarket(marketId: string): Promise<Product[]> {
    // TODO: Call your actual API
    const response = await fetch(`https://your-api.com/markets/${marketId}/products`);
    return response.json();
}

// Replace this mock function
async function fetchPrice(productId: string, marketId: string): Promise<PriceFetchResult> {
    // TODO: Call your actual pricing API
    const response = await fetch(
        `https://your-api.com/prices?product=${productId}&market=${marketId}`
    );
    
    return {
        product_id: productId,
        market_id: marketId,
        success: response.ok,
        duration_ms: ...,
        error: response.ok ? undefined : await response.text()
    };
}
```

### Customize Cache Directory

The default cache directory is `.cache/price-cache/`. To change it:

```typescript
// In src/lib/cache-instance.ts
const cacheService = new CacheService(
    { /* providers */ },
    '.cache/my-custom-path' // Change this
);
```

## Understanding the Dashboard

### Status Overview Card
- **Current State**: One of IDLE, INITIALIZING, PROCESSING, PAUSED, COMPLETED, ERROR
- **Overall Progress**: Percentage of all products processed
- **Total ETA**: Estimated time remaining (dynamically calculated)
- **Success Rate**: Percentage of successful price fetches

### Controls Card
- **Start/Resume**: Begin or continue processing
- **Stop**: Pause the process (saves state)
- **Reset**: Clear all data and start fresh
- **Auto-refresh**: Toggle automatic status updates

### Analytics Card
- **Total Success**: Number of successful price fetches
- **Total Fails**: Number of failed price fetches
- **Avg Time/Request**: Average time per price fetch in milliseconds

### Market Progress Card
Shows per-market details:
- Progress (completed/total)
- Success rate
- Failed count
- ETA for market completion
- Progress bar

### Process Details Card
- Started At timestamp
- Estimated End timestamp
- Current market being processed
- Total markets count

## Common Scenarios

### Scenario 1: Normal Operation
1. Click "Start Process"
2. Wait for completion
3. Check analytics for results

### Scenario 2: Server Restart During Processing
1. Process was running
2. Server crashes or restarts
3. Restart server
4. State is automatically detected as PAUSED
5. Click "Resume" to continue

### Scenario 3: Intentional Stop
1. Process is running
2. Click "Stop Process"
3. State changes to PAUSED
4. Later: Click "Resume" to continue

### Scenario 4: Error Handling
1. Process encounters errors
2. Errors are logged per market
3. Process continues with next product
4. View error details in analytics

### Scenario 5: Start Fresh
1. Click "Reset" button
2. Confirm the action
3. All cached data is cleared
4. Click "Start Process" for fresh run

## Troubleshooting

### Process Won't Start
- **Error**: "Process is already running"
- **Solution**: Click "Stop" first, then "Start"

### No Progress Updates
- **Issue**: Auto-refresh is off
- **Solution**: Enable "Auto-refresh" checkbox

### High Failure Rate
- **Check**: Network connectivity
- **Check**: API endpoint availability
- **Check**: Rate limiting issues

### Process Stuck
- **Solution**: Click "Stop", then "Reset"
- **Solution**: Restart server

### Cache Data Corrupted
- **Solution**: Click "Reset" to clear all cache
- **Alternative**: Manually delete `.cache` directory

## Data Persistence

All data is persisted to `.cache/price-cache/`:
- `state.json` - Current process state
- `market-{id}.json` - Per-market progress
- `analytics.json` - Overall statistics

You can inspect these files for debugging.

## Performance Tips

1. **Sequential Processing**: By design, processes one product at a time to avoid rate limiting
2. **ETA Accuracy**: Becomes more accurate after ~10 requests
3. **Auto-refresh**: 2-second interval balances freshness vs performance
4. **Cache Storage**: Uses efficient flat-file caching

## Next Steps

1. Replace mock data providers with real API calls
2. Customize UI styling if needed
3. Add authentication if deploying publicly
4. Set up monitoring and alerts
5. Consider adding retry logic for failed requests

## Support

For issues or questions:
- Check `ARCHITECTURE.md` for detailed technical documentation
- Review code comments in `src/lib/` directory
- Check console logs for error messages

---

Happy caching! 🚀

