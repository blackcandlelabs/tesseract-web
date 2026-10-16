<script>
	import Button from '#lib/components/Button.svelte';
</script>

<div class="login-page">
	<div class="login-container">
		<div class="login-card">
			<div class="branding">
				<div class="logo"></div>
				<h1>Tesseract</h1>
				<p class="tagline">Secure, end-to-end encrypted messaging</p>
			</div>
			
			<Button variant="primary">
				Sign in with Black Candle ID
			</Button>
			
			<p class="notice">
				You will be redirected to authenticate via Black Candle account provider
			</p>
		</div>
	</div>
</div>

<style>
	.login-page {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-bg-light-1);
	}
	
	.login-container {
		width: 100%;
		max-width: 400px;
		padding: var(--space-4);
	}
	
	.login-card {
		background: var(--color-bg-white);
		border-radius: var(--radius-lg);
		padding: var(--space-12);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}
	
	.branding {
		margin-bottom: var(--space-12);
	}
	
	.logo {
		width: 48px;
		height: 48px;
		background: var(--color-primary);
		border-radius: var(--radius-md);
		margin-bottom: var(--space-2);
	}
	
	h1 {
		font-size: var(--text-2xl);
		font-weight: 700;
		color: var(--color-text-primary);
		margin-bottom: var(--space-2);
	}
	
	.tagline {
		font-size: var(--text-lg);
		color: var(--color-text-secondary);
	}
	
	.notice {
		margin-top: var(--space-4);
		font-size: var(--text-sm);
		color: var(--color-text-tertiary);
		text-align: center;
		line-height: 1.5;
	}
</style>
