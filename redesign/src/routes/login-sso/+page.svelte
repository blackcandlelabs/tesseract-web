<script>
	let isRedirecting = $state(true);
</script>

<div class="login-sso-page">
	<div class="login-sso-container">
		<div class="logo-section">
			<div class="logo"></div>
			<h1>Tesseract</h1>
		</div>
		
		{#if isRedirecting}
			<div class="redirect-card">
				<div class="spinner"></div>
				<h2>Redirecting to Black Candle ID</h2>
				<p class="redirect-message">
					You will be redirected to authenticate via Black Candle account provider
				</p>
				<p class="redirect-url">
					<span class="mono">https://id.blackcandle.tech/oauth/authorize</span>
				</p>
			</div>
		{:else}
			<div class="status-card">
				<h2>Authentication Required</h2>
				<p>Click below to sign in with your Black Candle ID account</p>
				<button class="sso-button">
					Continue to Black Candle ID
				</button>
			</div>
		{/if}
		
		<p class="back-link">
			<a href="/login">← Back to login options</a>
		</p>
	</div>
</div>

<style>
	.login-sso-page {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-bg-light-1);
		padding: var(--space-6);
	}
	
	.login-sso-container {
		max-width: 480px;
		width: 100%;
		text-align: center;
	}
	
	.logo-section {
		margin-bottom: var(--space-8);
	}
	
	.logo {
		width: 64px;
		height: 64px;
		background: var(--color-primary);
		border-radius: var(--radius-md);
		margin: 0 auto var(--space-3);
	}
	
	h1 {
		font-size: var(--text-2xl);
		font-weight: 700;
		color: var(--color-text-primary);
	}
	
	.redirect-card, .status-card {
		background: var(--color-bg-white);
		border-radius: var(--radius-lg);
		padding: var(--space-12) var(--space-8);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		margin-bottom: var(--space-6);
	}
	
	.spinner {
		width: 48px;
		height: 48px;
		border: 4px solid var(--color-border);
		border-top-color: var(--color-primary);
		border-radius: var(--radius-full);
		margin: 0 auto var(--space-6);
		animation: spin 1s linear infinite;
	}
	
	@keyframes spin {
		to { transform: rotate(360deg); }
	}
	
	h2 {
		font-size: var(--text-xl);
		font-weight: 600;
		color: var(--color-text-primary);
		margin-bottom: var(--space-4);
	}
	
	.redirect-message {
		font-size: var(--text-base);
		color: var(--color-text-secondary);
		margin-bottom: var(--space-4);
		line-height: 1.5;
	}
	
	.redirect-url {
		margin-top: var(--space-4);
	}
	
	.mono {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-text-tertiary);
		background: var(--color-bg-light-2);
		padding: var(--space-2) var(--space-3);
		border-radius: var(--radius-sm);
		display: inline-block;
	}
	
	.sso-button {
		background: var(--color-primary);
		color: white;
		padding: var(--space-3) var(--space-6);
		border-radius: var(--radius-md);
		font-size: var(--text-lg);
		font-weight: 500;
		margin-top: var(--space-6);
		cursor: pointer;
		transition: background 0.15s ease;
	}
	
	.sso-button:hover {
		background: var(--color-primary-hover);
	}
	
	.back-link {
		font-size: var(--text-base);
	}
	
	.back-link a {
		color: var(--color-primary);
		text-decoration: none;
	}
	
	.back-link a:hover {
		text-decoration: underline;
	}
</style>
