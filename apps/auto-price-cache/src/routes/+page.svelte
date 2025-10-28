<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { StatusResponse, FetchLogEntry } from '$lib/types';
	import { ProcessStatus } from '$lib/types';

	let status = $state<StatusResponse | null>(null);
	let loading = $state(false);
	let error = $state<string | null>(null);
	let autoRefresh = $state(true);
	let refreshInterval: ReturnType<typeof setInterval> | null = null;
	
	// Fetch logs state
	let fetchLogs = $state<FetchLogEntry[]>([]);
	let fetchLogsStats = $state<{
		total: number;
		successful: number;
		failed: number;
		success_rate: number;
		avg_duration_ms: number;
	} | null>(null);
	let fetchLogsMetadata = $state<{
		run_id: string;
		started_at: string;
		total_logs: number;
	} | null>(null);
	let showFetchLogs = $state(true);

	onMount(() => {
		fetchStatus();
		fetchLogsData();
		startAutoRefresh();
	});

	onDestroy(() => {
		stopAutoRefresh();
	});

	function startAutoRefresh() {
		if (refreshInterval) return;
		refreshInterval = setInterval(() => {
			if (autoRefresh) {
				fetchStatus();
				fetchLogsData();
			}
		}, 2000); // Refresh every 2 seconds
	}

	function stopAutoRefresh() {
		if (refreshInterval) {
			clearInterval(refreshInterval);
			refreshInterval = null;
		}
	}

	async function fetchStatus() {
		try {
			const response = await fetch('/api/cache/prices/status');
			if (!response.ok) {
				throw new Error('Failed to fetch status');
			}
			status = await response.json();
			error = null;
		} catch (e) {
			error = e instanceof Error ? e.message : 'Unknown error';
			console.error('Error fetching status:', e);
		}
	}

	async function fetchLogsData() {
		try {
			const response = await fetch('/api/cache/prices/logs?limit=100');
			if (!response.ok) {
				throw new Error('Failed to fetch logs');
			}
			const data = await response.json();
			fetchLogs = data.logs || [];
			fetchLogsStats = data.stats || null;
			fetchLogsMetadata = data.metadata || null;
		} catch (e) {
			console.error('Error fetching logs:', e);
		}
	}

	async function startProcess() {
		loading = true;
		error = null;
		try {
			const response = await fetch('/api/cache/prices/start', {
				method: 'POST'
			});
			if (!response.ok) {
				const data = await response.json();
				throw new Error(data.error || 'Failed to start process');
			}
			await fetchStatus();
		} catch (e) {
			error = e instanceof Error ? e.message : 'Failed to start process';
		} finally {
			loading = false;
		}
	}

	async function stopProcess() {
		loading = true;
		error = null;
		try {
			const response = await fetch('/api/cache/prices/stop', {
				method: 'POST'
			});
			if (!response.ok) {
				throw new Error('Failed to stop process');
			}
			await fetchStatus();
		} catch (e) {
			error = e instanceof Error ? e.message : 'Failed to stop process';
		} finally {
			loading = false;
		}
	}

	async function resetProcess() {
		if (!confirm('Are you sure you want to reset? This will clear all cached data.')) {
			return;
		}

		loading = true;
		error = null;
		try {
			const response = await fetch('/api/cache/prices/reset', {
				method: 'POST'
			});
			if (!response.ok) {
				const data = await response.json();
				throw new Error(data.error || 'Failed to reset process');
			}
			await fetchStatus();
		} catch (e) {
			error = e instanceof Error ? e.message : 'Failed to reset process';
		} finally {
			loading = false;
		}
	}

	function getStatusColor(statusValue: ProcessStatus): string {
		switch (statusValue) {
			case ProcessStatus.IDLE:
				return 'bg-muted text-muted-foreground';
			case ProcessStatus.INITIALIZING:
				return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300';
			case ProcessStatus.PROCESSING:
				return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300';
			case ProcessStatus.PAUSED:
				return 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300';
			case ProcessStatus.COMPLETED:
				return 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300';
			case ProcessStatus.ERROR:
				return 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300';
			default:
				return 'bg-muted text-muted-foreground';
		}
	}

	function formatTime(isoString: string | null): string {
		if (!isoString) return 'N/A';
		return new Date(isoString).toLocaleString();
	}

	function formatDuration(minutes: number | null): string {
		if (minutes === null || minutes === 0) return 'N/A';
		if (minutes < 60) return `${Math.round(minutes)}m`;
		const hours = Math.floor(minutes / 60);
		const mins = Math.round(minutes % 60);
		return `${hours}h ${mins}m`; 
	}

	function formatDurationMs(ms: number): string {
		if (ms < 1000) return `${Math.round(ms)}ms`;
		return `${(ms / 1000).toFixed(2)}s`;
	}

	function formatTimestamp(isoString: string): string {
		const date = new Date(isoString);
		const now = new Date();
		const diff = now.getTime() - date.getTime();
		
		// Less than 60 seconds ago
		if (diff < 60000) {
			const seconds = Math.floor(diff / 1000);
			return `${seconds}s ago`;
		}
		
		// Less than 60 minutes ago
		if (diff < 3600000) {
			const minutes = Math.floor(diff / 60000);
			return `${minutes}m ago`;
		}
		
		// Otherwise show time
		return date.toLocaleTimeString();
	}
</script>

<div class="min-h-screen bg-background">
	<div class="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
		<!-- Header -->
		<header class="mb-8">
			<div class="flex items-start justify-between gap-4 flex-wrap">
				<div>
					<h1 class="text-3xl font-bold tracking-tight">Price Cache Dashboard</h1>
					<p class="text-muted-foreground mt-1">
						Monitor and control the automatic price caching process
					</p>
				</div>
				<form method="POST" action="/logout">
					<button
						type="submit"
						class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 py-2 px-4"
					>
						Logout
					</button>
				</form>
			</div>
		</header>

		{#if error}
			<div class="rounded-lg border border-destructive/50 bg-destructive/10 p-4 mb-6">
				<p class="text-sm text-destructive">
					<strong>Error:</strong>
					{error}
				</p>
			</div>
		{/if}

		{#if status}
			<!-- Status Overview -->
			<div class="rounded-lg border bg-card text-card-foreground shadow-sm mb-6">
				<div class="p-6">
					<h2 class="text-2xl font-semibold mb-4">Status Overview</h2>
					<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
						<div class="space-y-2">
							<p class="text-sm text-muted-foreground font-medium">Current State</p>
							<span
								class="inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold {getStatusColor(
									status.current_state.status
								)}"
							>
								{status.current_state.status}
							</span>
						</div>
						<div class="space-y-2">
							<p class="text-sm text-muted-foreground font-medium">Overall Progress</p>
							<p class="text-2xl font-bold">{status.overall_progress.toFixed(1)}%</p>
						</div>
						<div class="space-y-2">
							<p class="text-sm text-muted-foreground font-medium">Total ETA</p>
							<p class="text-2xl font-bold">{formatDuration(status.total_eta_minutes)}</p>
						</div>
						<div class="space-y-2">
							<p class="text-sm text-muted-foreground font-medium">Success Rate</p>
							<p class="text-2xl font-bold">{status.analytics.success_rate.toFixed(1)}%</p>
						</div>
					</div>

					{#if status.current_state.status === ProcessStatus.PROCESSING && status.current_state.current_market}
						<div class="space-y-2">
							<div class="h-2 w-full overflow-hidden rounded-full bg-secondary">
								<div
									class="h-full bg-primary transition-all duration-300"
									style="width: {status.overall_progress}%"
								></div>
							</div>
							<p class="text-sm text-muted-foreground text-center">
								Processing market: <strong>{status.current_state.current_market}</strong>
							</p>
						</div>
					{/if}
				</div>
			</div>

			<!-- Controls -->
			<div class="rounded-lg border bg-card text-card-foreground shadow-sm mb-6">
				<div class="p-6">
					<h2 class="text-2xl font-semibold mb-4">Controls</h2>
					<div class="flex flex-wrap gap-3 mb-4">
						<button
							onclick={startProcess}
							disabled={loading ||
								status.current_state.status === ProcessStatus.PROCESSING ||
								status.current_state.status === ProcessStatus.INITIALIZING}
							class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
						>
							{status.current_state.status === ProcessStatus.PAUSED ? 'Resume' : 'Start'} Process
						</button>
						<button
							onclick={stopProcess}
							disabled={loading ||
								!(
									status.current_state.status === ProcessStatus.PROCESSING ||
									status.current_state.status === ProcessStatus.INITIALIZING
								)}
							class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
						>
							Stop Process
						</button>
						<button
							onclick={resetProcess}
							disabled={loading ||
								status.current_state.status === ProcessStatus.PROCESSING ||
								status.current_state.status === ProcessStatus.INITIALIZING}
							class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 py-2"
						>
							Reset
						</button>
					</div>
					<label class="flex items-center gap-2 cursor-pointer select-none">
						<input
							type="checkbox"
							bind:checked={autoRefresh}
							class="h-4 w-4 rounded border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
						/>
						<span class="text-sm font-medium">Auto-refresh (every 2s)</span>
					</label>
				</div>
			</div>

			<!-- Analytics -->
			<div class="rounded-lg border bg-card text-card-foreground shadow-sm mb-6">
				<div class="p-6">
					<h2 class="text-2xl font-semibold mb-4">Analytics</h2>
					<div class="grid gap-4 md:grid-cols-3">
						<div class="flex flex-col items-center justify-center space-y-1 p-6 rounded-lg bg-muted/50">
							<p class="text-3xl font-bold">{status.analytics.total_success.toLocaleString()}</p>
							<p class="text-xs text-muted-foreground uppercase tracking-wide">Total Success</p>
						</div>
						<div class="flex flex-col items-center justify-center space-y-1 p-6 rounded-lg bg-muted/50">
							<p class="text-3xl font-bold">{status.analytics.total_fails.toLocaleString()}</p>
							<p class="text-xs text-muted-foreground uppercase tracking-wide">Total Fails</p>
						</div>
						<div class="flex flex-col items-center justify-center space-y-1 p-6 rounded-lg bg-muted/50">
							<p class="text-3xl font-bold"
								>{status.analytics.avg_time_per_request_ms.toFixed(0)}ms</p
							>
							<p class="text-xs text-muted-foreground uppercase tracking-wide">Avg Time/Request</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Market Progress -->
			<div class="rounded-lg border bg-card text-card-foreground shadow-sm mb-6">
				<div class="p-6">
					<h2 class="text-2xl font-semibold mb-4">Market Progress</h2>
					<div class="space-y-4">
						{#each Object.entries(status.markets) as [marketId, marketData] (marketId)}
							<div class="rounded-lg border p-4 space-y-3">
								<div class="flex items-center justify-between">
									<h3 class="text-lg font-semibold">{marketId}</h3>
									<span class="text-lg font-semibold text-primary"
										>{marketData.completed}/{marketData.total}</span
									>
								</div>
								<div class="flex flex-wrap gap-4 text-sm text-muted-foreground">
									<span>
										Success Rate: <strong class="text-foreground"
											>{marketData.success_rate.toFixed(1)}%</strong
										>
									</span>
									<span>
										Failed: <strong class="text-foreground">{marketData.failed}</strong>
									</span>
									<span>
										ETA: <strong class="text-foreground"
											>{formatDuration(marketData.eta_minutes)}</strong
										>
									</span>
								</div>
								{#if marketData.total > 0}
									<div class="h-2 w-full overflow-hidden rounded-full bg-secondary">
										<div
											class="h-full bg-primary transition-all duration-300"
											style="width: {(marketData.completed / marketData.total) * 100}%"
										></div>
									</div>
								{/if}
							</div>
						{/each}
					</div>
				</div>
			</div>

			<!-- Process Details -->
			<div class="rounded-lg border bg-card text-card-foreground shadow-sm mb-6">
				<div class="p-6">
					<h2 class="text-2xl font-semibold mb-4">Process Details</h2>
					<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						<div class="space-y-1">
							<p class="text-xs text-muted-foreground uppercase tracking-wide">Started At</p>
							<p class="text-sm font-medium">{formatTime(status.current_state.started_at)}</p>
						</div>
						<div class="space-y-1">
							<p class="text-xs text-muted-foreground uppercase tracking-wide">Estimated End</p>
							<p class="text-sm font-medium">
								{formatTime(status.current_state.estimated_end_at)}
							</p>
						</div>
						<div class="space-y-1">
							<p class="text-xs text-muted-foreground uppercase tracking-wide">Total ETA</p>
							<p class="text-sm font-medium">{formatDuration(status.total_eta_minutes)}</p>
						</div>
						<div class="space-y-1">
							<p class="text-xs text-muted-foreground uppercase tracking-wide">Current Market</p>
							<p class="text-sm font-medium">
								{status.current_state.current_market || 'None'}
							</p>
						</div>
						<div class="space-y-1">
							<p class="text-xs text-muted-foreground uppercase tracking-wide">Total Markets</p>
							<p class="text-sm font-medium">{status.current_state.total_markets}</p>
						</div>
						<div class="space-y-1">
							<p class="text-xs text-muted-foreground uppercase tracking-wide">
								Completed Markets
							</p>
							<p class="text-sm font-medium">
								{status.current_state.current_market_index}/{status.current_state.total_markets}
							</p>
						</div>
					</div>
				</div>
			</div>
		{:else}
			<div class="rounded-lg border bg-card text-card-foreground shadow-sm">
				<div class="p-6">
					<p class="text-muted-foreground">Loading status...</p>
				</div>
			</div>
		{/if}

		<!-- Fetch Logs Section -->
		<div class="rounded-lg border bg-card text-card-foreground shadow-sm">
			<div class="p-6">
				<div class="flex items-center justify-between mb-4">
					<h2 class="text-2xl font-semibold">Fetch Call Logs</h2>
					<button
						onclick={() => (showFetchLogs = !showFetchLogs)}
						class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
					>
						{showFetchLogs ? 'Hide' : 'Show'}
					</button>
				</div>

				{#if showFetchLogs}
					{#if fetchLogsStats}
						<div class="grid gap-4 md:grid-cols-5 mb-6 p-4 rounded-lg bg-muted/50">
							<div class="flex flex-col items-center space-y-1">
								<p class="text-2xl font-bold">{fetchLogsStats.total}</p>
								<p class="text-xs text-muted-foreground uppercase tracking-wide">Total Calls</p>
							</div>
							<div class="flex flex-col items-center space-y-1">
								<p class="text-2xl font-bold text-green-600 dark:text-green-400">
									{fetchLogsStats.successful}
								</p>
								<p class="text-xs text-muted-foreground uppercase tracking-wide">Successful</p>
							</div>
							<div class="flex flex-col items-center space-y-1">
								<p class="text-2xl font-bold text-red-600 dark:text-red-400">
									{fetchLogsStats.failed}
								</p>
								<p class="text-xs text-muted-foreground uppercase tracking-wide">Failed</p>
							</div>
							<div class="flex flex-col items-center space-y-1">
								<p class="text-2xl font-bold">{fetchLogsStats.success_rate.toFixed(1)}%</p>
								<p class="text-xs text-muted-foreground uppercase tracking-wide">Success Rate</p>
							</div>
							<div class="flex flex-col items-center space-y-1">
								<p class="text-2xl font-bold">
									{formatDurationMs(fetchLogsStats.avg_duration_ms)}
								</p>
								<p class="text-xs text-muted-foreground uppercase tracking-wide">Avg Duration</p>
							</div>
						</div>
					{/if}

					{#if fetchLogsMetadata}
						<div class="flex flex-wrap gap-6 mb-6 p-3 rounded-md bg-muted/30 text-sm text-muted-foreground">
							<span>
								Run ID: <strong class="text-foreground">{fetchLogsMetadata.run_id}</strong>
							</span>
							<span>
								Started: <strong class="text-foreground"
									>{formatTime(fetchLogsMetadata.started_at)}</strong
								>
							</span>
						</div>
					{/if}

					<div class="space-y-4">
						{#if fetchLogs.length === 0}
							<p class="text-center py-8 text-muted-foreground">No fetch calls logged yet</p>
						{:else}
							<div class="rounded-md border overflow-hidden">
								<div class="overflow-x-auto">
									<table class="w-full text-sm">
										<thead class="border-b bg-muted/50">
											<tr>
												<th class="h-12 px-4 text-left align-middle font-medium">Time</th>
												<th class="h-12 px-4 text-left align-middle font-medium">Status</th>
												<th class="h-12 px-4 text-left align-middle font-medium">URL</th>
												<th class="h-12 px-4 text-left align-middle font-medium">Market</th>
												<th class="h-12 px-4 text-left align-middle font-medium">Product ID</th>
												<th class="h-12 px-4 text-left align-middle font-medium">Duration</th>
												<th class="h-12 px-4 text-left align-middle font-medium">Error</th>
											</tr>
										</thead>
										<tbody>
											{#each fetchLogs as log (log.id)}
												<tr
													class="border-b transition-colors hover:bg-muted/50 {log.success
														? 'bg-green-50/50 dark:bg-green-950/20'
														: 'bg-red-50/50 dark:bg-red-950/20'}"
												>
													<td class="p-4 align-middle text-xs text-muted-foreground">
														{formatTimestamp(log.timestamp)}
													</td>
													<td class="p-4 align-middle">
														<span
															class="inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold {log.success
																? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300'
																: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'}"
														>
															{log.success ? '✓' : '✗'}
														</span>
													</td>
													<td
														class="p-4 align-middle font-mono text-xs max-w-xs truncate"
														title={log.url}
													>
														{log.url}
													</td>
													<td class="p-4 align-middle">{log.market_id}</td>
													<td class="p-4 align-middle">{log.product_id}</td>
													<td class="p-4 align-middle">{formatDurationMs(log.duration_ms)}</td>
													<td class="p-4 align-middle text-xs text-destructive max-w-xs truncate">
														{log.error || '-'}
													</td>
												</tr>
											{/each}
										</tbody>
									</table>
								</div>
							</div>
						{/if}
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
