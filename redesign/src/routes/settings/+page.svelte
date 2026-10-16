<script>
	import Avatar from '#lib/components/Avatar.svelte';
	import Badge from '#lib/components/Badge.svelte';
	
	const settingsSections = [
		{ name: 'Profile', active: true },
		{ name: 'Devices & Sessions', active: false },
		{ name: 'Notifications', active: false },
		{ name: 'Security', active: false },
		{ name: 'Privacy', active: false }
	];
	
	const sessions = [
		{ device: 'Desktop - macOS', lastSeen: 'Last seen: now (Current session)', verified: true },
		{ device: 'Mobile - Android', lastSeen: 'Last seen: 2 hours ago', verified: true }
	];
</script>

<div class="settings-page">
	<div class="settings-header">
		<h1>Settings</h1>
	</div>
	
	<div class="settings-content">
		<div class="settings-sidebar">
			{#each settingsSections as section}
				<div class="settings-nav-item" class:active={section.active}>
					{section.name}
				</div>
			{/each}
		</div>
		
		<div class="settings-main">
			<div class="profile-section">
				<div class="profile-header">
					<Avatar color="#8B5CF6" name="Alice Thompson" size={72} />
					<div class="profile-info">
						<h2>Alice Thompson</h2>
						<p class="matrix-id">@alice:blackcandle.tech</p>
					</div>
				</div>
			</div>
			
			<div class="section">
				<h3>Active Sessions</h3>
				<div class="sessions">
					{#each sessions as session}
						<div class="session-item">
							<div class="session-info">
								<div class="session-device">{session.device}</div>
								<div class="session-last-seen">{session.lastSeen}</div>
							</div>
							{#if session.verified}
								<Badge variant="verified">
									<div class="verified-icon">✓</div>
									Verified
								</Badge>
							{/if}
						</div>
					{/each}
				</div>
			</div>
			
			<div class="section">
				<h3>Notifications</h3>
				<div class="notification-card">
					<div class="notification-title">UnifiedPush configured</div>
					<div class="notification-description">
						Notifications are delivered through UnifiedPush. No Google services required.
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.settings-page {
		min-height: 100vh;
		background: var(--color-bg-white);
		display: flex;
		flex-direction: column;
	}
	
	.settings-header {
		height: 64px;
		padding: 0 var(--space-6);
		display: flex;
		align-items: center;
		border-bottom: 1px solid var(--color-border-light);
	}
	
	.settings-header h1 {
		font-size: var(--text-2xl);
		font-weight: 600;
		color: var(--color-text-primary);
	}
	
	.settings-content {
		display: flex;
		flex: 1;
	}
	
	.settings-sidebar {
		width: 240px;
		border-right: 1px solid var(--color-border-light);
		padding: var(--space-4);
	}
	
	.settings-nav-item {
		padding: var(--space-3);
		border-radius: var(--radius-md);
		font-size: var(--text-lg);
		color: var(--color-text-secondary);
		cursor: pointer;
		transition: all 0.15s ease;
	}
	
	.settings-nav-item:hover {
		background: var(--color-bg-light-1);
		color: var(--color-text-primary);
	}
	
	.settings-nav-item.active {
		background: var(--color-bg-light-2);
		color: var(--color-text-primary);
		font-weight: 500;
	}
	
	.settings-main {
		flex: 1;
		padding: var(--space-8) var(--space-12);
		max-width: 1200px;
	}
	
	.profile-section {
		margin-bottom: var(--space-12);
	}
	
	.profile-header {
		display: flex;
		gap: var(--space-5);
		align-items: center;
	}
	
	.profile-info h2 {
		font-size: var(--text-2xl);
		font-weight: 600;
		color: var(--color-text-primary);
		margin-bottom: var(--space-1);
	}
	
	.matrix-id {
		font-family: var(--font-mono);
		font-size: var(--text-md);
		color: var(--color-text-secondary);
	}
	
	.section {
		margin-bottom: var(--space-12);
	}
	
	.section h3 {
		font-size: var(--text-xl);
		font-weight: 600;
		color: var(--color-text-primary);
		margin-bottom: var(--space-6);
	}
	
	.sessions {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}
	
	.session-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--space-4);
		background: var(--color-bg-light-1);
		border-radius: var(--radius-md);
	}
	
	.session-device {
		font-size: var(--text-lg);
		font-weight: 500;
		color: var(--color-text-primary);
		margin-bottom: var(--space-1);
	}
	
	.session-last-seen {
		font-size: var(--text-md);
		color: var(--color-text-secondary);
	}
	
	.verified-icon {
		width: 12px;
		height: 12px;
		border-radius: var(--radius-full);
		background: var(--color-verified);
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-size: 8px;
	}
	
	.notification-card {
		padding: var(--space-4);
		background: var(--color-bg-light-1);
		border-radius: var(--radius-md);
	}
	
	.notification-title {
		font-size: var(--text-lg);
		font-weight: 500;
		color: var(--color-text-primary);
		margin-bottom: var(--space-1);
	}
	
	.notification-description {
		font-size: var(--text-md);
		color: var(--color-text-secondary);
		line-height: 1.5;
	}
</style>
