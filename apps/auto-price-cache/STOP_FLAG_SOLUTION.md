# Stop Flag Solution for Memory Leak Issue

## Problem Identified

The cache service was experiencing continuous fetch logging even when paused, leading to memory leaks. This was caused by:

1. **Zombie Processes from HMR**: When code changes in development, SvelteKit's Hot Module Reload creates new service instances, but old instances continue running in the background as "zombie processes"
2. **In-memory Stop Flag**: The old `shouldStop` flag was stored in memory, so only the current instance could see it
3. **Shared Log Files**: All instances (old and new) write to the same log files, causing continuous growth
4. **No Coordination**: No mechanism for different process instances to coordinate

## Solution: Filesystem-Based Process Control

### Key Innovation
Use the **filesystem as a single source of truth** for process control flags. All process instances (including zombie processes from HMR) check the same file, ensuring coordinated behavior.

### Architecture

```
ProcessControlService (New)
├── Uses flat-cache for filesystem persistence
├── Manages stop flag that ALL instances can read
└── Methods:
    ├── requestStop() - Create stop flag
    ├── clearStopRequest() - Remove stop flag  
    ├── isStopRequested() - Check if stop requested
    └── getStopRequestMetadata() - Get stop details

CacheService (Refactored)
├── Injects ProcessControlService
├── Checks stop flag before each operation
└── Multiple instances coordinate via filesystem
```

### How It Works

1. **Start/Resume**: Clears the stop flag file
2. **Processing Loop**: Checks `processControl.isStopRequested()` before each product
3. **Stop Button Clicked**: Creates stop flag file via `processControl.requestStop()`
4. **All Instances Check**: Both old (zombie) and new instances check the same file
5. **Coordinated Stop**: All running processes see the flag and pause

### Benefits

✅ **HMR-Safe**: Works across hot module reloads  
✅ **No Cleanup Needed**: Don't need to track and kill old instances  
✅ **Consistent Pattern**: Uses same flat-cache approach as other services  
✅ **Separation of Concerns**: Flag management separate from business logic  
✅ **Reusable**: Can be used by other services needing process control  
✅ **Memory Safe**: Prevents zombie processes from running indefinitely  

### File Structure

```
src/lib/
├── ProcessControlService.ts (NEW) - Manages stop flags
├── CacheService.ts (MODIFIED) - Uses ProcessControlService
├── StorageService.ts - Manages data persistence
└── FetchLogService.ts - Manages fetch logs

.cache/price-cache/
├── process-control - Stop flag file
├── state - Process state
├── analytics - Analytics data
└── market-* - Market-specific data
```

### Example Flow

```typescript
// User clicks Start
cacheService.start()
  → processControl.clearStopRequest() // Remove flag
  → Processing begins
  → Loop checks: processControl.isStopRequested() // false, continues

// User clicks Stop (while old process still running)
cacheService.stop()
  → processControl.requestStop() // Creates flag file

// Next iteration (ALL instances check)
OLD Instance: processControl.isStopRequested() // true, stops
NEW Instance: processControl.isStopRequested() // true, stops

// Logs stop growing ✅
```

### Testing

To verify the fix:
1. Start the cache process
2. Make a code change (trigger HMR)
3. Click Stop
4. Verify logs stop growing immediately
5. Check that no zombie processes continue

## Credits

Solution suggested by the user: "Instead of cleaning up after HMR, we could rely on filesystem to check for flags in the stop process."

