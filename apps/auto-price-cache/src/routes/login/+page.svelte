<script lang="ts">
	import { enhance } from '$app/forms';
	
	let { form } = $props();
</script>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
	<div class="w-full max-w-md">
		<div class="rounded-lg border bg-card text-card-foreground shadow-lg">
			<div class="p-8 space-y-6">
				<!-- Header -->
				<div class="space-y-2 text-center">
					<div class="flex justify-center mb-4">
						<div class="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6 text-primary"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
								/>
							</svg>
						</div>
					</div>
					<h1 class="text-2xl font-semibold tracking-tight">Price Cache Dashboard</h1>
					<p class="text-sm text-muted-foreground">Enter your password to access the dashboard</p>
				</div>

				<!-- Form -->
				<form method="POST" use:enhance class="space-y-4">
					<div class="space-y-2">
						<label for="password" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
							Password
						</label>
						<input
							type="password"
							id="password"
							name="password"
							required
							placeholder="Enter your password"
							class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
						/>
					</div>

					{#if form?.error}
						<div class="rounded-md border border-destructive/50 bg-destructive/10 p-3">
							<p class="text-sm text-destructive">
								{form.error}
							</p>
						</div>
					{/if}

					<button
						type="submit"
						class="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
					>
						Sign In
					</button>
				</form>

				<!-- Footer -->
				<div class="pt-4 border-t">
					<p class="text-xs text-center text-muted-foreground">
						Check your environment variables or use default credentials
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
