<script lang="ts">
	import { enhance } from '$app/forms';
	
	let { form } = $props();
</script>

<div class="login-container">
	<div class="login-card">
		<div class="login-header">
			<h1>🔒 Price Cache Dashboard</h1>
			<p>Please enter the password to continue</p>
		</div>

		<form method="POST" use:enhance>
			<div class="form-group">
				<label for="password">Password</label>
				<input
					type="password"
					id="password"
					name="password"
					required
					autofocus
					placeholder="Enter password"
				/>
			</div>

			{#if form?.error}
				<div class="error-message">
					{form.error}
				</div>
			{/if}

			<button type="submit" class="login-btn">
				Login
			</button>
		</form>

		<div class="login-footer">
			<p class="hint">
				Hint: Check your environment variables or use default credentials
			</p>
		</div>
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
			sans-serif;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		min-height: 100vh;
	}

	.login-container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		padding: 1rem;
	}

	.login-card {
		background: white;
		border-radius: 12px;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
		width: 100%;
		max-width: 420px;
		padding: 2.5rem;
		animation: slideUp 0.4s ease-out;
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.login-header {
		text-align: center;
		margin-bottom: 2rem;
	}

	.login-header h1 {
		font-size: 1.75rem;
		margin: 0 0 0.5rem 0;
		color: #2c3e50;
	}

	.login-header p {
		margin: 0;
		color: #7f8c8d;
		font-size: 0.95rem;
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	.form-group label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 600;
		color: #34495e;
		font-size: 0.9rem;
	}

	.form-group input {
		width: 100%;
		padding: 0.875rem;
		border: 2px solid #e0e0e0;
		border-radius: 8px;
		font-size: 1rem;
		transition: all 0.2s;
		box-sizing: border-box;
	}

	.form-group input:focus {
		outline: none;
		border-color: #667eea;
		box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
	}

	.error-message {
		background: #fee;
		border: 1px solid #fcc;
		color: #c33;
		padding: 0.875rem;
		border-radius: 6px;
		margin-bottom: 1rem;
		font-size: 0.9rem;
		text-align: center;
	}

	.login-btn {
		width: 100%;
		padding: 1rem;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		border: none;
		border-radius: 8px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s;
	}

	.login-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
	}

	.login-btn:active {
		transform: translateY(0);
	}

	.login-footer {
		margin-top: 1.5rem;
		text-align: center;
	}

	.hint {
		margin: 0;
		color: #95a5a6;
		font-size: 0.85rem;
	}
</style>

