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
				return 'bg-gray-100 text-gray-800';
			case ProcessStatus.INITIALIZING:
				return 'bg-blue-100 text-blue-800';
			case ProcessStatus.PROCESSING:
				return 'bg-yellow-100 text-yellow-800';
			case ProcessStatus.PAUSED:
				return 'bg-purple-100 text-purple-800';
			case ProcessStatus.COMPLETED:
				return 'bg-green-100 text-green-800';
			case ProcessStatus.ERROR:
				return 'bg-red-100 text-red-800';
			default:
				return 'bg-gray-100 text-gray-800';
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

<div class="container">
	<header>
		<h1>Price Cache Dashboard</h1>
		<p>Monitor and control the automatic price caching process</p>
	</header>

	{#if error}
		<div class="alert error">
			<strong>Error:</strong>
			{error}
		</div>
	{/if}

	{#if status}
		<!-- Status Overview -->
		<div class="card">
			<h2>Status Overview </h2>
			<div class="status-grid">
				<div class="status-item">
					<span class="label">Current State</span>
					<span class="badge {getStatusColor(status.current_state.status)}">
						{status.current_state.status}
					</span>
				</div>
				<div class="status-item">
					<span class="label">Overall Progress</span>
					<span class="value">{status.overall_progress.toFixed(1)}%</span>
				</div>
				<div class="status-item">
					<span class="label">Total ETA</span>
					<span class="value">{formatDuration(status.total_eta_minutes)}</span>
				</div>
				<div class="status-item">
					<span class="label">Success Rate</span>
					<span class="value">{status.analytics.success_rate.toFixed(1)}%</span>
				</div>
			</div>

			{#if status.current_state.status === ProcessStatus.PROCESSING && status.current_state.current_market}
				<div class="progress-bar">
					<div class="progress-fill" style="width: {status.overall_progress}%"></div>
				</div>
				<p class="progress-text">
					Processing market: <strong>{status.current_state.current_market}</strong> 
				</p>
			{/if}
		</div>

		<!-- Controls -->
		<div class="card">
			<h2>Controls</h2>
			<div class="button-group">
				<button
					onclick={startProcess}
					disabled={loading ||
						status.current_state.status === ProcessStatus.PROCESSING ||
						status.current_state.status === ProcessStatus.INITIALIZING}
					class="btn btn-primary"
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
					class="btn btn-secondary"
				>
					Stop Process
				</button>
				<button
					onclick={resetProcess}
					disabled={loading ||
						status.current_state.status === ProcessStatus.PROCESSING ||
						status.current_state.status === ProcessStatus.INITIALIZING}
					class="btn btn-danger"
				>
					Reset
				</button>
			</div>
			<label class="checkbox-label">
				<input type="checkbox" bind:checked={autoRefresh} />
				Auto-refresh (every 2s)
			</label>
		</div>

		<!-- Analytics -->
		<div class="card">
			<h2>Analytics</h2>
			<div class="stats-grid">
				<div class="stat">
					<span class="stat-value">{status.analytics.total_success.toLocaleString()}</span>
					<span class="stat-label">Total Success</span>
				</div>
				<div class="stat">
					<span class="stat-value">{status.analytics.total_fails.toLocaleString()}</span>
					<span class="stat-label">Total Fails</span>
				</div>
				<div class="stat">
					<span class="stat-value"
						>{status.analytics.avg_time_per_request_ms.toFixed(0)}ms</span
					>
					<span class="stat-label">Avg Time/Request</span>
				</div>
			</div>
		</div>

		<!-- Market Progress -->
		<div class="card">
			<h2>Market Progress</h2>
			<div class="market-list">
				{#each Object.entries(status.markets) as [marketId, marketData] (marketId)}
					<div class="market-item">
						<div class="market-header">
							<h3>{marketId}</h3>
							<span class="market-progress"
								>{marketData.completed}/{marketData.total}</span
							>
						</div>
						<div class="market-stats">
							<span class="market-stat">
								Success Rate: <strong>{marketData.success_rate.toFixed(1)}%</strong>
							</span>
							<span class="market-stat">
								Failed: <strong>{marketData.failed}</strong>
							</span>
							<span class="market-stat">
								ETA: <strong>{formatDuration(marketData.eta_minutes)}</strong>
							</span>
						</div>
						{#if marketData.total > 0}
							<div class="progress-bar small">
								<div
									class="progress-fill"
									style="width: {(marketData.completed / marketData.total) * 100}%"
								></div>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>

		<!-- Process Details -->
		<div class="card">
			<h2>Process Details</h2>
			<div class="details-grid">
				<div class="detail-item">
					<span class="detail-label">Started At</span>
					<span class="detail-value">{formatTime(status.current_state.started_at)}</span>
				</div>
				<div class="detail-item">
					<span class="detail-label">Estimated End</span>
					<span class="detail-value"
						>{formatTime(status.current_state.estimated_end_at)}</span
					>
				</div>
				<div class="detail-item">
					<span class="detail-label">Total ETA</span>
					<span class="detail-value">{formatDuration(status.total_eta_minutes)}</span>
				</div>
				<div class="detail-item">
					<span class="detail-label">Current Market</span>
					<span class="detail-value"
						>{status.current_state.current_market || 'None'}</span
					>
				</div>
				<div class="detail-item">
					<span class="detail-label">Total Markets</span>
					<span class="detail-value">{status.current_state.total_markets}</span>
				</div>
				<div class="detail-item">
					<span class="detail-label">Completed Markets</span>
					<span class="detail-value">{status.current_state.current_market_index}/{status.current_state.total_markets}</span>
				</div>
			</div>
		</div>
	{:else}
		<div class="card">
			<p>Loading status...</p>
		</div>
	{/if}

	<!-- Fetch Logs Section -->
	<div class="card">
		<div class="logs-header">
			<h2>Fetch Call Logs</h2>
			<button class="btn-toggle" onclick={() => (showFetchLogs = !showFetchLogs)}>
				{showFetchLogs ? 'Hide' : 'Show'}
			</button>
		</div>

		{#if showFetchLogs}
			{#if fetchLogsStats}
				<div class="logs-stats">
					<div class="log-stat">
						<span class="log-stat-value">{fetchLogsStats.total}</span>
						<span class="log-stat-label">Total Calls</span>
					</div>
					<div class="log-stat">
						<span class="log-stat-value success">{fetchLogsStats.successful}</span>
						<span class="log-stat-label">Successful</span>
					</div>
					<div class="log-stat">
						<span class="log-stat-value failed">{fetchLogsStats.failed}</span>
						<span class="log-stat-label">Failed</span>
					</div>
					<div class="log-stat">
						<span class="log-stat-value">{fetchLogsStats.success_rate.toFixed(1)}%</span>
						<span class="log-stat-label">Success Rate</span>
					</div>
					<div class="log-stat">
						<span class="log-stat-value"
							>{formatDurationMs(fetchLogsStats.avg_duration_ms)}</span
						>
						<span class="log-stat-label">Avg Duration</span>
					</div>
				</div>
			{/if}

			{#if fetchLogsMetadata}
				<div class="logs-metadata">
					<span class="metadata-item">
						Run ID: <strong>{fetchLogsMetadata.run_id}</strong>
					</span>
					<span class="metadata-item">
						Started: <strong>{formatTime(fetchLogsMetadata.started_at)}</strong>
					</span>
				</div>
			{/if}

			<div class="logs-container">
				{#if fetchLogs.length === 0}
					<p class="no-logs">No fetch calls logged yet</p>
				{:else}
					<div class="logs-table-wrapper">
						<table class="logs-table">
							<thead>
								<tr>
									<th>Time</th>
									<th>Status</th>
									<th>URL</th>
									<th>Market</th>
									<th>Product ID</th>
									<th>Duration</th>
									<th>Error</th>
								</tr>
							</thead>
							<tbody>
								{#each fetchLogs as log (log.id)}
									<tr class={log.success ? 'log-success' : 'log-failed'}>
										<td class="log-time">{formatTimestamp(log.timestamp)}</td>
										<td>
											<span class="status-badge {log.success ? 'success' : 'failed'}">
												{log.success ? '✓' : '✗'}
											</span>
										</td>
										<td class="log-url" title={log.url}>{log.url}</td>
										<td>{log.market_id}</td>
										<td>{log.product_id}</td>
										<td>{formatDurationMs(log.duration_ms)}</td>
										<td class="log-error">{log.error || '-'}</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
			sans-serif;
		background: #f5f7fa;
		color: #2c3e50;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}

	header {
		margin-bottom: 2rem;
	}

	h1 {
		font-size: 2.5rem;
		margin: 0 0 0.5rem 0;
		color: #2c3e50;
	}

	h2 {
		font-size: 1.5rem;
		margin: 0 0 1rem 0;
		color: #34495e;
	}

	h3 {
		font-size: 1.1rem;
		margin: 0;
		color: #34495e;
	}

	p {
		margin: 0;
		color: #7f8c8d;
	}

	.card {
		background: white;
		border-radius: 8px;
		padding: 1.5rem;
		margin-bottom: 1.5rem;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.alert {
		padding: 1rem;
		border-radius: 4px;
		margin-bottom: 1rem;
	}

	.alert.error {
		background: #fee;
		border: 1px solid #fcc;
		color: #c33;
	}

	.status-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.status-item {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.label {
		font-size: 0.875rem;
		color: #7f8c8d;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.value {
		font-size: 1.5rem;
		font-weight: 600;
		color: #2c3e50;
	}

	.badge {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		border-radius: 4px;
		font-size: 0.875rem;
		font-weight: 600;
		width: fit-content;
	}

	.progress-bar {
		height: 24px;
		background: #ecf0f1;
		border-radius: 12px;
		overflow: hidden;
		margin-bottom: 0.5rem;
	}

	.progress-bar.small {
		height: 8px;
		border-radius: 4px;
	}

	.progress-fill {
		height: 100%;
		background: linear-gradient(90deg, #3498db, #2ecc71);
		transition: width 0.3s ease;
	}

	.progress-text {
		text-align: center;
		font-size: 0.875rem;
		color: #7f8c8d;
	}

	.button-group {
		display: flex;
		gap: 1rem;
		margin-bottom: 1rem;
		flex-wrap: wrap;
	}

	.btn {
		padding: 0.75rem 1.5rem;
		border: none;
		border-radius: 4px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s;
	}

	.btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.btn-primary {
		background: #3498db;
		color: white;
	}

	.btn-primary:hover:not(:disabled) {
		background: #2980b9;
	}

	.btn-secondary {
		background: #95a5a6;
		color: white;
	}

	.btn-secondary:hover:not(:disabled) {
		background: #7f8c8d;
	}

	.btn-danger {
		background: #e74c3c;
		color: white;
	}

	.btn-danger:hover:not(:disabled) {
		background: #c0392b;
	}

	.checkbox-label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
		user-select: none;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 1.5rem;
	}

	.stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	.stat-value {
		font-size: 2rem;
		font-weight: 700;
		color: #2c3e50;
	}

	.stat-label {
		font-size: 0.875rem;
		color: #7f8c8d;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		margin-top: 0.25rem;
	}

	.market-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.market-item {
		border: 1px solid #ecf0f1;
		border-radius: 6px;
		padding: 1rem;
	}

	.market-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.75rem;
	}

	.market-progress {
		font-size: 1.25rem;
		font-weight: 600;
		color: #3498db;
	}

	.market-stats {
		display: flex;
		gap: 1.5rem;
		margin-bottom: 0.75rem;
		flex-wrap: wrap;
	}

	.market-stat {
		font-size: 0.875rem;
		color: #7f8c8d;
	}

	.details-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1rem;
	}

	.detail-item {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.detail-label {
		font-size: 0.75rem;
		color: #7f8c8d;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.detail-value {
		font-size: 1rem;
		color: #2c3e50;
		font-weight: 500;
	}

	/* Fetch Logs Styles */
	.logs-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.btn-toggle {
		padding: 0.5rem 1rem;
		border: 1px solid #ddd;
		border-radius: 4px;
		background: white;
		cursor: pointer;
		font-size: 0.875rem;
		transition: all 0.2s;
	}

	.btn-toggle:hover {
		background: #f5f7fa;
		border-color: #3498db;
	}

	.logs-stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
		gap: 1rem;
		margin-bottom: 1rem;
		padding: 1rem;
		background: #f8f9fa;
		border-radius: 6px;
	}

	.log-stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	.log-stat-value {
		font-size: 1.5rem;
		font-weight: 700;
		color: #2c3e50;
	}

	.log-stat-value.success {
		color: #27ae60;
	}

	.log-stat-value.failed {
		color: #e74c3c;
	}

	.log-stat-label {
		font-size: 0.75rem;
		color: #7f8c8d;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		margin-top: 0.25rem;
	}

	.logs-metadata {
		display: flex;
		gap: 2rem;
		margin-bottom: 1rem;
		padding: 0.75rem 1rem;
		background: #ecf0f1;
		border-radius: 4px;
		font-size: 0.875rem;
		color: #7f8c8d;
		flex-wrap: wrap;
	}

	.metadata-item strong {
		color: #2c3e50;
	}

	.logs-container {
		margin-top: 1rem;
	}

	.no-logs {
		text-align: center;
		padding: 2rem;
		color: #7f8c8d;
		font-style: italic;
	}

	.logs-table-wrapper {
		overflow-x: auto;
		border: 1px solid #ecf0f1;
		border-radius: 6px;
	}

	.logs-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.875rem;
	}

	.logs-table thead {
		background: #f8f9fa;
		border-bottom: 2px solid #ecf0f1;
	}

	.logs-table th {
		padding: 0.75rem;
		text-align: left;
		font-weight: 600;
		color: #34495e;
		text-transform: uppercase;
		font-size: 0.75rem;
		letter-spacing: 0.5px;
	}

	.logs-table td {
		padding: 0.75rem;
		border-bottom: 1px solid #ecf0f1;
	}

	.logs-table tbody tr:hover {
		background: #f8f9fa;
	}

	.logs-table tbody tr.log-success {
		background: rgba(39, 174, 96, 0.05);
	}

	.logs-table tbody tr.log-failed {
		background: rgba(231, 76, 60, 0.05);
	}

	.log-time {
		white-space: nowrap;
		color: #7f8c8d;
		font-size: 0.8rem;
	}

	.log-url {
		font-family: 'Courier New', monospace;
		font-size: 0.8rem;
		max-width: 300px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.log-error {
		color: #e74c3c;
		font-size: 0.8rem;
		max-width: 200px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.status-badge {
		display: inline-block;
		width: 24px;
		height: 24px;
		line-height: 24px;
		text-align: center;
		border-radius: 50%;
		font-weight: bold;
		font-size: 0.875rem;
	}

	.status-badge.success {
		background: #d4edda;
		color: #155724;
	}

	.status-badge.failed {
		background: #f8d7da;
		color: #721c24;
	}
</style>
