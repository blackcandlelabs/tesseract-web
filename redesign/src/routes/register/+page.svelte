<script>
	let isRedirecting = $state(true);
</script>

<div class="register-page">
	<div class="register-container">
		<div class="header">
			<div class="logo"></div>
			<h1>Create Account</h1>
			<p class="tagline">Join Tesseract with your Black Candle ID</p>
		</div>
		
		{#if isRedirecting}
			<div class="redirect-card">
				<div class="spinner"></div>
				<h2>Redirecting to Black Candle ID</h2>
				<p>
					You will be redirected to create or link your Black Candle account
				</p>
				<div class="info-box">
					<h3>What happens next?</h3>
					<ul>
						<li>Create a Black Candle ID account if you don't have one</li>
						<li>Authorize Tesseract to access your account</li>
						<li>Set up your secure encryption keys</li>
						<li>Start messaging with end-to-end encryption</li>
					</ul>
				</div>
			</div>
		{/if}
		
		<p class="back-link">
			Already have an account? <a href="/login">Sign in</a>
		</p>
	</div>
</div>

<style>
	.register-page {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-bg-light-1);
		padding: var(--space-6);
	}
	
	.register-container {
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
	
	.info-box {
		background: var(--color-bg-light-1);
		border-radius: var(--radius-md);
		padding: var(--space-5);
		text-align: left;
		margin-top: var(--space-6);
	}
	
	.info-box h3 {
		font-size: var(--text-lg);
		font-weight: 600;
		color: var(--color-text-primary);
		margin-bottom: var(--space-3);
	}
	
	.info-box ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	
	.info-box li {
		font-size: var(--text-base);
		color: var(--color-text-secondary);
		padding-left: var(--space-6);
		margin-bottom: var(--space-2);
		position: relative;
	}
	
	.info-box li:before {
		content: '✓';
		position: absolute;
		left: 0;
		color: var(--color-encryption);
		font-weight: 600;
	}
	
	.back-link {
		font-size: var(--text-base);
		color: var(--color-text-secondary);
	}
	
	.back-link a {
		color: var(--color-primary);
		text-decoration: none;
	}
	
	.back-link a:hover {
		text-decoration: underline;
	}
</style>
