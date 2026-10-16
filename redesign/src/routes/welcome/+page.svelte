<script>
	import Button from '#lib/components/Button.svelte';
</script>

<div class="welcome-page">
	<div class="welcome-container">
		<div class="welcome-content">
			<div class="branding">
				<div class="logo"></div>
				<h1>Tesseract</h1>
				<p class="tagline">Secure, end-to-end encrypted messaging</p>
				<p class="description">
					Connect with your team through encrypted conversations. 
					Built on Matrix with verified encryption and UnifiedPush notifications.
				</p>
			</div>
			
			<div class="actions">
				<Button variant="primary">Get Started</Button>
				<Button variant="secondary">Sign In</Button>
			</div>
			
			<div class="features">
				<div class="feature">
					<div class="feature-icon green">🛡️</div>
					<h3>End-to-End Encrypted</h3>
					<p>All messages are encrypted by default</p>
				</div>
				<div class="feature">
					<div class="feature-icon">🔔</div>
					<h3>UnifiedPush</h3>
					<p>Privacy-respecting notifications</p>
				</div>
				<div class="feature">
					<div class="feature-icon">🌐</div>
					<h3>Federated</h3>
					<p>Built on the Matrix protocol</p>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.welcome-page {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-bg-white);
		padding: var(--space-6);
	}
	
	.welcome-container {
		max-width: 800px;
		width: 100%;
	}
	
	.welcome-content {
		text-align: center;
	}
	
	.branding {
		margin-bottom: var(--space-12);
	}
	
	.logo {
		width: 80px;
		height: 80px;
		background: var(--color-primary);
		border-radius: var(--radius-lg);
		margin: 0 auto var(--space-4);
	}
	
	h1 {
		font-size: 48px;
		font-weight: 700;
		color: var(--color-text-primary);
		margin-bottom: var(--space-3);
	}
	
	.tagline {
		font-size: var(--text-xl);
		color: var(--color-text-secondary);
		margin-bottom: var(--space-4);
	}
	
	.description {
		font-size: var(--text-lg);
		color: var(--color-text-secondary);
		line-height: 1.6;
		max-width: 600px;
		margin: 0 auto;
	}
	
	.actions {
		display: flex;
		gap: var(--space-4);
		justify-content: center;
		margin-bottom: var(--space-16);
	}
	
	.features {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: var(--space-8);
		margin-top: var(--space-12);
	}
	
	.feature {
		text-align: center;
	}
	
	.feature-icon {
		width: 64px;
		height: 64px;
		margin: 0 auto var(--space-3);
		border-radius: var(--radius-full);
		background: var(--color-bg-light-1);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32px;
	}
	
	.feature-icon.green {
		color: var(--color-encryption);
		background: #16A34A15;
	}
	
	.feature h3 {
		font-size: var(--text-lg);
		font-weight: 600;
		color: var(--color-text-primary);
		margin-bottom: var(--space-2);
	}
	
	.feature p {
		font-size: var(--text-base);
		color: var(--color-text-secondary);
	}
</style>
