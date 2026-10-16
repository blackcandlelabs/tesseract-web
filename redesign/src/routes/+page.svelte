<script>
	import Button from '#lib/components/Button.svelte';
	
	const pages = [
		{ name: 'Login', path: '/login', type: 'Desktop' },
		{ name: 'Chat List', path: '/chat-list', type: 'Desktop' },
		{ name: 'Conversation', path: '/conversation', type: 'Desktop' },
		{ name: 'Settings / Profile', path: '/settings', type: 'Desktop' },
		{ name: 'Call Pre-join', path: '/call-prejoin', type: 'Desktop' },
		{ name: 'Call In-call', path: '/call-incall', type: 'Desktop' },
		{ name: 'Mobile Chat List', path: '/mobile-chat-list', type: 'Mobile' },
		{ name: 'Mobile Conversation', path: '/mobile-conversation', type: 'Mobile' }
	];
</script>

<div class="gallery">
	<header class="gallery-header">
		<div class="logo">
			<div class="logo-icon"></div>
			<h1>Tesseract</h1>
		</div>
		<p class="tagline">Redesign Pass 2 — Secure Signal</p>
		<p class="source">
			<a href="https://www.figma.com/design/6LyoQKfdG5Lpm5DOLRlYNY" target="_blank">
				Figma Source: Tesseract — Redesign Pass 2
			</a>
		</p>
	</header>
	
	<div class="sections">
		<section class="section">
			<h2>Desktop Screens</h2>
			<div class="grid">
				{#each pages.filter(p => p.type === 'Desktop') as page}
					<a href={page.path} class="card">
						<div class="card-content">
							<h3>{page.name}</h3>
							<span class="arrow">→</span>
						</div>
					</a>
				{/each}
			</div>
		</section>
		
		<section class="section">
			<h2>Mobile Screens</h2>
			<div class="grid">
				{#each pages.filter(p => p.type === 'Mobile') as page}
					<a href={page.path} class="card">
						<div class="card-content">
							<h3>{page.name}</h3>
							<span class="arrow">→</span>
						</div>
					</a>
				{/each}
			</div>
		</section>
	</div>
</div>

<style>
	.gallery {
		min-height: 100vh;
		background: var(--color-bg-light-1);
		padding: var(--space-16) var(--space-6);
	}
	
	.gallery-header {
		max-width: 1200px;
		margin: 0 auto var(--space-16);
		text-align: center;
	}
	
	.logo {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-3);
		margin-bottom: var(--space-4);
	}
	
	.logo-icon {
		width: 48px;
		height: 48px;
		background: var(--color-primary);
		border-radius: var(--radius-md);
	}
	
	.logo h1 {
		font-size: var(--text-2xl);
		font-weight: 700;
		color: var(--color-text-primary);
	}
	
	.tagline {
		font-size: var(--text-lg);
		color: var(--color-text-secondary);
		margin-bottom: var(--space-2);
	}
	
	.source {
		font-size: var(--text-sm);
		color: var(--color-text-tertiary);
	}
	
	.source a {
		color: var(--color-primary);
		text-decoration: underline;
	}
	
	.sections {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: var(--space-12);
	}
	
	.section h2 {
		font-size: var(--text-xl);
		font-weight: 600;
		color: var(--color-text-primary);
		margin-bottom: var(--space-6);
	}
	
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: var(--space-4);
	}
	
	.card {
		background: var(--color-bg-white);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border-light);
		transition: all 0.2s ease;
		cursor: pointer;
	}
	
	.card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
		border-color: var(--color-primary);
	}
	
	.card-content {
		padding: var(--space-6);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.card h3 {
		font-size: var(--text-lg);
		font-weight: 600;
		color: var(--color-text-primary);
	}
	
	.arrow {
		font-size: var(--text-2xl);
		color: var(--color-primary);
		transition: transform 0.2s ease;
	}
	
	.card:hover .arrow {
		transform: translateX(4px);
	}
</style>
