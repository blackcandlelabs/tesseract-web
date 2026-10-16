<script>
	let isRedirecting = $state(true);
</script>

<div class="forgot-password-page">
	<div class="forgot-password-container">
		<div class="header">
			<div class="logo"></div>
			<h1>Reset Password</h1>
			<p class="tagline">Recover your account via Black Candle ID</p>
		</div>
		
		{#if isRedirecting}
			<div class="redirect-card">
				<div class="spinner"></div>
				<h2>Redirecting to Black Candle ID</h2>
				<p>
					You will be redirected to the Black Candle account recovery process
				</p>
				<div class="security-notice">
					<div class="notice-icon">🛡️</div>
					<div class="notice-content">
						<h3>Secure Recovery</h3>
						<p>
							Password reset is handled by Black Candle ID using secure authentication. 
							Your encryption keys remain protected throughout the recovery process.
						</p>
					</div>
				</div>
			</div>
		{/if}
		
		<p class="back-link">
			<a href="/login">← Back to sign in</a>
		</p>
	</div>
</div>

<style>
	.forgot-password-page {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-bg-light-1);
		padding: var(--space-6);
	}
	
	.forgot-password-container {
		max-width: 520px;
		width: 100%;
		text-align: center;
	}
	
	.header {
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
		font-size: 32px;
		font-weight: 700;
		color: var(--color-text-primary);
		margin-bottom: var(--space-2);
	}
	
	.tagline {
		font-size: var(--text-lg);
		color: var(--color-text-secondary);
	}
	
	.redirect-card {
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
		margin-bottom: var(--space-3);
	}
	
	.redirect-card > p {
		font-size: var(--text-base);
		color: var(--color-text-secondary);
		margin-bottom: var(--space-6);
	}
	
	.security-notice {
		background: #16A34A08;
		border: 1px solid #16A34A20;
		border-radius: var(--radius-md);
		padding: var(--space-5);
		display: flex;
		gap: var(--space-4);
		text-align: left;
		margin-top: var(--space-6);
	}
	
	.notice-icon {
		font-size: 32px;
		flex-shrink: 0;
	}
	
	.notice-content h3 {
		font-size: var(--text-lg);
		font-weight: 600;
		color: var(--color-text-primary);
		margin-bottom: var(--space-2);
	}
	
	.notice-content p {
		font-size: var(--text-base);
		color: var(--color-text-secondary);
		line-height: 1.5;
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
