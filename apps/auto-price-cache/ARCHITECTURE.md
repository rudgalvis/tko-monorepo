# Architecture Documentation

## System Overview

The Auto Price Cache system implements a sophisticated state machine architecture for reliable, resumable, and monitored price caching across multiple markets.

## Component Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                          API Layer                              │
├─────────────────────────────────────────────────────────────────┤
│  POST /api/cache/prices/start   │  GET /api/cache/prices/status │
│  POST /api/cache/prices/stop    │  POST /api/cache/prices/reset │
└────────────────┬────────────────────────────────┬────────────────┘
                 │                                │
                 ▼                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                       Service Layer                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │              CacheService (Orchestrator)                │  │
│  │  • Coordinates entire caching operation                 │  │
│  │  • Manages process lifecycle                            │  │
│  │  • Handles crash recovery                               │  │
│  └────────┬─────────────────────────────────┬──────────────┘  │
│           │                                 │                 │
│           ▼                                 ▼                 │
│  ┌──────────────────┐           ┌────────────────────────┐   │
│  │   StateMachine   │           │   MarketProcessor      │   │
│  │  • IDLE          │           │  • Sequential logic    │   │
│  │  • INITIALIZING  │           │  • Progress tracking   │   │
│  │  • PROCESSING    │           │  • ETA calculation     │   │
│  │  • PAUSED        │           │  • Error handling      │   │
│  │  • COMPLETED     │           └────────────────────────┘   │
│  │  • ERROR         │                                        │
│  └──────────────────┘                                        │
│                                                                 │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Storage Layer (flat-cache)                   │
├─────────────────────────────────────────────────────────────────┤
│  state.json        │  market-{id}.json    │  analytics.json    │
│  • Current state   │  • Market progress   │  • Success stats   │
│  • Market list     │  • Completed count   │  • Failure stats   │
│  • Current index   │  • Success/Fail      │  • Avg times       │
│  • Timestamps      │  • Error logs        │  • Per-market data │
└─────────────────────────────────────────────────────────────────┘
```

## State Flow Diagram

```
                     ┌──────┐
                     │ IDLE │
                     └──┬───┘
                        │ start()
                        ▼
                ┌────────────────┐
                │ INITIALIZING   │
                │ • Load markets │
                │ • Load products│
                └───┬────────────┘
                    │
                    ▼
            ┌───────────────┐
            │  PROCESSING   │◄────┐
            │ • Fetch prices│     │
            │ • Track ETA   │     │
            │ • Save state  │     │
            └─┬─────┬───┬───┘     │
              │     │   │         │
      ┌───────┘     │   └────┐    │
      │             │        │    │
      ▼             ▼        ▼    │
  ┌───────┐    ┌───────┐  ┌──────────┐
  │ ERROR │    │PAUSED │  │COMPLETED │
  └───┬───┘    └───┬───┘  └──────────┘
      │            │
      │            │ resume()
      └────────────┴────────────────────┘
```

## Data Flow

### 1. Initialization Flow
```
User clicks "Start"
    │
    ▼
POST /api/cache/prices/start
    │
    ▼
CacheService.start()
    │
    ├─→ Check Lock (prevent duplicate)
    │
    ├─→ Check Resume (load from cache)
    │
    ├─→ StateMachine.transitionToInitializing()
    │
    ├─→ Load Markets
    │
    └─→ StorageService.saveProcessState()
```

### 2. Processing Flow
```
For each Market:
    │
    ├─→ Load Products for Market
    │
    ├─→ Create MarketProcessor
    │
    └─→ For each Product:
            │
            ├─→ Fetch Price (HTTP Request)
            │
            ├─→ Track Success/Failure
            │
            ├─→ Update Progress
            │
            ├─→ Calculate ETA
            │
            ├─→ StorageService.saveMarketProgress()
            │
            └─→ StorageService.updateAnalytics()
```

### 3. Status Query Flow
```
GET /api/cache/prices/status
    │
    ▼
CacheService.getStatus()
    │
    ├─→ StateMachine.getState()
    │
    ├─→ StorageService.loadMarketProgress() (for each market)
    │
    ├─→ StorageService.loadAnalytics()
    │
    ├─→ Calculate Overall Progress
    │
    └─→ Return StatusResponse
```

## Key Features Implementation

### 1. Lock Mechanism
```typescript
// Prevents duplicate processes
isLocked(): boolean {
    return this.state.status === PROCESSING || 
           this.state.status === INITIALIZING;
}
```

### 2. Crash Recovery
```typescript
// On initialization, check for interrupted process
checkForInterruption(): void {
    if (storage.wasInterrupted()) {
        state = storage.loadProcessState();
        stateMachine.loadState(state);
        stateMachine.transitionToPaused();
    }
}
```

### 3. ETA Calculation
```typescript
// Dynamic ETA based on running average
updateETA(): void {
    const remaining = total - completed;
    const avgTime = avg_time_per_request_ms;
    const remainingTimeMs = remaining * avgTime;
    eta_minutes = remainingTimeMs / 60000;
}
```

### 4. Progress Tracking
```typescript
// Real-time progress updates
processProduct(product): void {
    const result = await fetchPrice(product.id);
    
    // Update counters
    completed++;
    if (result.success) successful++;
    else failed++;
    
    // Update average time
    avg_time = (avg_time * (completed - 1) + duration) / completed;
    
    // Persist to disk
    storage.save();
}
```

## Error Handling Strategy

### Network Errors
- Caught and logged per product
- Stored in market error logs
- Does not stop entire process
- Tracked in analytics

### State Errors
- Validated by StateMachine
- Invalid transitions throw errors
- Prevents corrupt state

### Crash Recovery
- All state persisted to disk
- Automatic detection on startup
- Seamless resumption from last point

## Performance Considerations

### Sequential Processing
- One request at a time per market
- Prevents rate limiting
- Consistent timing for ETA

### Disk I/O
- State saved after each product
- Async writes (non-blocking)
- Minimal performance impact

### Memory Usage
- Only current market in memory
- Old market data cleared
- Efficient for large datasets

## Security Considerations

### API Endpoints
- No authentication (internal tool)
- Could add API keys if needed

### File System
- Cache stored in local `.cache/` directory
- Not exposed via HTTP
- Gitignored by default

## Extension Points

### Custom Data Providers
Replace mock implementations in `cache-instance.ts`:
- `getAvailableMarkets()` - Your market source
- `getProductsForMarket()` - Your product source
- `fetchPrice()` - Your pricing API

### Custom Storage
Replace `StorageService` with:
- Database (PostgreSQL, MongoDB)
- Redis for distributed systems
- S3 for cloud storage

### Custom State Transitions
Extend `StateMachine` with:
- Additional states
- Custom validation rules
- Event hooks

### Monitoring & Alerting
Add integrations for:
- Logging (Winston, Pino)
- Metrics (Prometheus)
- Alerts (Email, Slack)

## Testing Strategy

### Unit Tests
- StateMachine state transitions
- MarketProcessor calculations
- StorageService persistence

### Integration Tests
- API endpoints
- Full process flow
- Crash recovery

### E2E Tests
- Complete user workflows
- UI interactions
- Real data scenarios

## Deployment

### Development
```bash
pnpm dev
```

### Production
```bash
pnpm build
pnpm preview
```

### Docker (future)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN pnpm install && pnpm build
CMD ["pnpm", "preview"]
```

---

Built with SvelteKit, TypeScript, and flat-cache


# Original mermaid diagram


Implement graph TB
    subgraph "API Layer"
        START["POST /api/cache/prices/start"]
        STATUS["GET /api/cache/prices/status"]
    end

    subgraph "Service Layer"
        CacheService["CacheService<br/>(Orchestrator)"]
        StateMachine["StateMachine<br/>(State Management)"]
        MarketProcessor["MarketProcessor<br/>(Sequential Handler)"]
    end

    subgraph "State Machine States"
        IDLE["IDLE"]
        INIT["INITIALIZING<br/>Load markets + product IDs"]
        PROCESSING["PROCESSING<br/>Fetching prices"]
        PAUSED["PAUSED<br/>Server restart detected"]
        COMPLETED["COMPLETED"]
        ERROR["ERROR"]
    end

    subgraph "Storage Layer - flat-cache"
        StateCache["state.json<br/>Current process state"]
        MarketCache["market-{id}.json<br/>Per market progress"]
        AnalyticsCache["analytics.json<br/>Success/Fail counts"]
    end

    subgraph "Process Flow"
        GetMarkets["1. Get Available Markets"]
        GetProducts["2. Get Product IDs<br/>per Market"]
        Sequential["3. Sequential<br/>HTTP Requests"]
        Track["4. Track Result"]
        UpdateETA["5. Update ETA<br/>& Analytics"]
        Persist["6. Persist to FS"]
        CheckNext["7. Next Product"]
    end

    subgraph "Data Models"
        ProcessState["ProcessState<br/>├─ status: enum<br/>├─ current_market<br/>├─ current_product_idx<br/>├─ started_at<br/>└─ estimated_end_at"]
        
        MarketProgress["MarketProgress<br/>├─ market_id<br/>├─ total_products<br/>├─ completed<br/>├─ successful<br/>├─ failed<br/>├─ eta<br/>└─ errors"]
        
        Analytics["Analytics<br/>├─ total_requests<br/>├─ total_success<br/>├─ total_fails<br/>├─ avg_time_per_request<br/>└─ markets[]: {}</br>"]
    end

    subgraph "Checks & Guards"
        CheckLock["CheckLock:<br/>Prevent duplicate process"]
        CheckResume["CheckResume:<br/>Load from cache if exists"]
        CheckRate["CheckRate:<br/>Monitor success rate<br/>for ETA accuracy"]
    end

    START -->|Request| CacheService
    STATUS -->|Request| CacheService
    
    CacheService -->|Initialize| StateMachine
    CacheService -->|Delegate| MarketProcessor
    CacheService -->|Persist state| StateCache
    
    StateMachine -->|Transition| IDLE
    StateMachine -->|Validate| CheckLock
    StateMachine -->|Validate| CheckResume
    
    CheckLock -->|Safe to proceed| INIT
    CheckResume -->|Resume from cache| PROCESSING
    
    INIT -->|Load| GetMarkets
    INIT -->|Load| GetProducts
    
    INIT --> PROCESSING
    PROCESSING --> Sequential
    
    Sequential --> Track
    Track --> UpdateETA
    Track --> Analytics
    
    UpdateETA -->|Check| CheckRate
    CheckRate -->|Update| MarketCache
    
    UpdateETA --> Persist
    Persist --> CheckNext
    
    CheckNext -->|More products?| Sequential
    CheckNext -->|All done| COMPLETED
    Sequential -->|HTTP error| ERROR
    ERROR -->|Retry logic| PROCESSING
    
    MarketProcessor -->|Read| StateCache
    MarketProcessor -->|Read| MarketCache
    MarketProcessor -->|Update| AnalyticsCache
    
    STATUS -->|Read| StateCache
    STATUS -->|Read| AnalyticsCache
    STATUS -->|Calculate| Analytics
    STATUS -->|Return| Response["Response:<br/>├─ current_state<br/>├─ markets[]: {<br/>│  ├─ completed: 5000/20000<br/>│  ├─ success_rate: 98.5%<br/>│  ├─ failed: 300<br/>│  └─ eta_minutes: 45<br/>│}<br/>├─ overall_progress: 25%<br/>└─ total_eta: 180min"]
    
    ProcessState -.->|Used by| StateMachine
    MarketProgress -.->|Used by| MarketProcessor
    Analytics -.->|Used by| STATUS
    
    style IDLE fill:#e1f5e1
    style PROCESSING fill:#fff4e1
    style COMPLETED fill:#e1f5ff
    style ERROR fill:#ffe1e1
    style PAUSED fill:#f0e1ff

