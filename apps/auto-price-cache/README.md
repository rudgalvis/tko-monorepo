# Auto Price Cache

A robust, stateful price caching system built with SvelteKit. This application implements a sophisticated state machine to manage the sequential processing of product prices across multiple markets with automatic persistence, resumption capabilities, and real-time progress tracking.

## Architecture Overview

The system follows a layered architecture based on the following components:

### API Layer
- `GET /api/cache/prices/start` - Start or resume the caching process
- `GET /api/cache/prices/status` - Get current status and progress
- `GET /api/cache/prices/stop` - Stop the running process
- `GET /api/cache/prices/reset` - Reset and clear all cached data

### Service Layer
- **CacheService** - Main orchestrator coordinating the entire caching operation
- **StateMachine** - Manages state transitions and validations
- **MarketProcessor** - Handles sequential processing of products within a market
- **StorageService** - Manages persistence using flat-cache

### State Machine States
- `IDLE` - Ready to start
- `INITIALIZING` - Loading markets and product data
- `PROCESSING` - Actively fetching prices
- `PAUSED` - Paused (can be resumed)
- `COMPLETED` - All markets processed
- `ERROR` - Error occurred

### Storage Layer (flat-cache)
- `state.json` - Current process state
- `market-{id}.json` - Per-market progress tracking
- `analytics.json` - Overall success/fail statistics

## Features

✅ **Password Protection** - Secure authentication to protect dashboard access  
✅ **State Persistence** - Automatic saving of progress to filesystem  
✅ **Crash Recovery** - Automatically resumes from last saved state after interruption  
✅ **Sequential Processing** - Controlled, rate-limited processing of products  
✅ **Real-time Progress** - Live ETA calculation and progress tracking  
✅ **Per-Market Analytics** - Detailed success rates and error tracking  
✅ **Lock Mechanism** - Prevents duplicate processes  
✅ **Graceful Stopping** - Stop process at any time with state preservation  
✅ **Beautiful Dashboard** - Real-time UI with auto-refresh capabilities  

## Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables (optional)
# Create a .env file and set DASHBOARD_PASSWORD
echo "DASHBOARD_PASSWORD=your-secure-password" > .env

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Usage

### Starting the Application

```bash
pnpm dev
```

Navigate to `http://localhost:5174` to access the dashboard.

### Authentication

The dashboard is protected by password authentication. On first access, you'll be prompted to log in.

**Default Password:** `admin123`

**Setting a Custom Password:**

Set the `DASHBOARD_PASSWORD` environment variable:

```bash
# Option 1: Using .env file
echo "DASHBOARD_PASSWORD=your-secure-password" > .env

# Option 2: Inline with command
DASHBOARD_PASSWORD=your-secure-password pnpm dev

# Option 3: Export in your shell
export DASHBOARD_PASSWORD=your-secure-password
pnpm dev
```

**Security Notes:**
- Always change the default password in production
- The session cookie is valid for 7 days
- Use the "Logout" button in the dashboard to end your session

### Dashboard Controls

- **Start/Resume Process** - Begins caching or resumes from paused state
- **Stop Process** - Gracefully stops the current operation
- **Reset** - Clears all cached data and resets to initial state
- **Auto-refresh** - Toggle automatic status updates (every 2 seconds)

### API Usage

#### Start Process
```bash
curl -X POST http://localhost:5173/api/cache/prices/start
```

#### Get Status
```bash
curl http://localhost:5173/api/cache/prices/status
```

#### Stop Process
```bash
curl -X POST http://localhost:5173/api/cache/prices/stop
```

#### Reset
```bash
curl -X POST http://localhost:5173/api/cache/prices/reset
```

## Configuration

### Data Providers

The system uses mock data providers in `src/lib/cache-instance.ts`. Replace these with your actual implementations:

```typescript
// Replace with actual API calls
async function getAvailableMarkets(): Promise<Market[]> {
  // Your implementation
}

async function getProductsForMarket(marketId: string): Promise<Product[]> {
  // Your implementation
}

async function fetchPrice(productId: string, marketId: string): Promise<PriceFetchResult> {
  // Your implementation
}
```

### Cache Directory

By default, cache files are stored in `.cache/price-cache/`. You can customize this in the CacheService instantiation:

```typescript
const cacheService = new CacheService(
  { /* data providers */ },
  '.cache/custom-path' // Custom cache directory
);
```

## Data Models

### ProcessState
Tracks the overall caching operation state.

```typescript
interface ProcessState {
  status: ProcessStatus;
  current_market: string | null;
  current_product_idx: number;
  started_at: string | null;
  estimated_end_at: string | null;
  markets: string[];
  total_markets: number;
  current_market_index: number;
}
```

### MarketProgress
Per-market progress and statistics.

```typescript
interface MarketProgress {
  market_id: string;
  total_products: number;
  completed: number;
  successful: number;
  failed: number;
  eta_minutes: number | null;
  errors: ErrorLog[];
  avg_time_per_request_ms: number;
}
```

### Analytics
Overall analytics and success metrics.

```typescript
interface Analytics {
  total_requests: number;
  total_success: number;
  total_fails: number;
  avg_time_per_request_ms: number;
  success_rate: number;
  markets: Record<string, MarketStats>;
}
```

## Process Flow

1. **Initialization** - Load available markets and product lists
2. **Sequential Processing** - Process each market one at a time
3. **Product Iteration** - Fetch prices for each product sequentially
4. **Progress Tracking** - Update progress, ETA, and analytics in real-time
5. **Persistence** - Save state to filesystem after each update
6. **Completion** - Transition to completed state when all markets are done

## Error Handling

- **Network Errors** - Logged and tracked in per-market error logs
- **State Errors** - Invalid state transitions throw descriptive errors
- **Crash Recovery** - Automatically detects interrupted processes on startup
- **Success Rate Monitoring** - Warns if success rate drops below threshold

## Development

### Project Structure

```
src/
├── lib/
│   ├── types.ts                 # Type definitions
│   ├── StateMachine.ts          # State management
│   ├── MarketProcessor.ts       # Market processing logic
│   ├── StorageService.ts        # Persistence layer
│   ├── CacheService.ts          # Main orchestrator
│   └── cache-instance.ts        # Singleton instance
└── routes/
    ├── +page.svelte             # Dashboard UI
    └── api/
        └── cache/
            └── prices/
                ├── start/+server.ts
                ├── status/+server.ts
                ├── stop/+server.ts
                └── reset/+server.ts
```

### Testing

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:unit
```

### Linting

```bash
# Check linting
pnpm lint

# Auto-fix linting issues
pnpm format
```

## Technical Details

### State Transitions

The StateMachine enforces valid state transitions:

- `IDLE` → `INITIALIZING`
- `INITIALIZING` → `PROCESSING` | `ERROR`
- `PROCESSING` → `PROCESSING` | `COMPLETED` | `ERROR` | `PAUSED`
- `PAUSED` → `PROCESSING` | `ERROR`
- `COMPLETED` → `IDLE`
- `ERROR` → `IDLE` | `PROCESSING`

### ETA Calculation

ETA is dynamically calculated based on:
- Average time per request (running average)
- Remaining products in current market
- Remaining markets to process

### Success Rate Monitoring

The system tracks success rates at both market and overall levels:
- Warns if market success rate drops below 80%
- Provides detailed error logs for failed requests
- Calculates rolling averages for accurate ETA

## License

MIT

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

Built with ❤️ using SvelteKit
