<script>
    import { statePages } from '#lib/states';
    import { dialogPages } from '#lib/dialogs';
    import { settingsPages } from '#lib/settings';
    import { wave2Pages } from '#lib/wave2';
	import Button from '#lib/components/Button.svelte';
	
	const foundationPages = [
		{ name: 'Login', path: '/login' },
		{ name: 'Chat List', path: '/chat-list' },
		{ name: 'Conversation', path: '/conversation' },
		{ name: 'Settings / Profile', path: '/settings' },
		{ name: 'Call Pre-join', path: '/call-prejoin' },
		{ name: 'Call In-call', path: '/call-incall' },
		{ name: 'Mobile Chat List', path: '/mobile-chat-list' },
		{ name: 'Mobile Conversation', path: '/mobile-conversation' }
	];
	
	const wave1Pages = [
		{ name: 'Welcome', path: '/welcome' },
		{ name: 'Login SSO Handoff', path: '/login-sso' },
		{ name: 'Login QR', path: '/login-qr' },
		{ name: 'Register', path: '/register' },
		{ name: 'Forgot Password', path: '/forgot-password' },
		{ name: 'Home', path: '/home' },
		{ name: 'Room Shell', path: '/room-shell' }
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
            <h2>Wave 5 — States &amp; Calls</h2>
            <p class="section-description">Context menus, Element Call, location, empty states and connection recovery</p>
            <div class="grid">
                {#each statePages as page}
                    <a href={page.path} class="card">
                        <div class="card-content"><h3>{page.name}</h3><span class="arrow">→</span></div>
                    </a>
                {/each}
            </div>
        </section>
        <section class="section">
            <h2>Wave 4 — Dialogs</h2>
            <p class="section-description">Private rooms, invitations, search, security, moderation and media</p>
            <div class="grid">
                {#each dialogPages as page}
                    <a href={page.path} class="card">
                        <div class="card-content"><h3>{page.name}</h3><span class="arrow">→</span></div>
                    </a>
                {/each}
            </div>
        </section>
        <section class="section">
            <h2>Wave 3 — Settings</h2>
            <p class="section-description">Account, encryption, notifications, calls, room and space settings</p>
            <div class="grid">
                {#each settingsPages as page}
                    <a href={page.path} class="card">
                        <div class="card-content"><h3>{page.name}</h3><span class="arrow">→</span></div>
                    </a>
                {/each}
            </div>
        </section>
        <section class="section">
            <h2>Wave 2 — Room Ecosystem</h2>
            <p class="section-description">Room details, people, threads, encryption, and message interactions</p>
            <div class="grid">
                {#each wave2Pages as page}
                    <a href={page.path} class="card">
                        <div class="card-content"><h3>{page.name}</h3><span class="arrow">→</span></div>
                    </a>
                {/each}
            </div>
        </section>
		<section class="section">
			<h2>Wave 1 — Core Screens</h2>
			<p class="section-description">Authentication flows and primary navigation</p>
			<div class="grid">
				{#each wave1Pages as page}
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
			<h2>Foundation Screens</h2>
			<p class="section-description">Original design pass — desktop and mobile layouts</p>
			<div class="grid">
				{#each foundationPages as page}
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
		margin-bottom: var(--space-2);
	}
	
	.section-description {
		font-size: var(--text-base);
		color: var(--color-text-secondary);
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
