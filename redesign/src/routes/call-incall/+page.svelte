<script>
	import Badge from '#lib/components/Badge.svelte';
	
	const participants = [
		{ name: 'Alice', color: '#8B5CF6' },
		{ name: 'Bob', color: '#16A34A' },
		{ name: 'Charlie', color: '#F59E0B' }
	];
</script>

<div class="call-incall-page">
	<div class="call-header">
		<Badge variant="encrypted">
			<div class="shield-icon">🛡️</div>
			Encrypted call
		</Badge>
	</div>
	
	<div class="participants-grid">
		{#each participants as participant}
			<div class="participant-tile">
				<div class="video-placeholder" style="background: {participant.color}20;"></div>
				<div class="participant-label">
					{participant.name}
				</div>
			</div>
		{/each}
	</div>
	
	<div class="call-controls">
		<div class="control-button mute">
			<div class="control-icon"></div>
		</div>
		<div class="control-button camera">
			<div class="control-icon"></div>
		</div>
		<div class="control-button screen">
			<div class="control-icon"></div>
		</div>
		<div class="control-button hangup">
			<div class="control-icon"></div>
		</div>
	</div>
</div>

<style>
	.call-incall-page {
		height: 100vh;
		background: var(--color-bg-dark);
		display: flex;
		flex-direction: column;
		padding: var(--space-6);
	}
	
	.call-header {
		display: flex;
		justify-content: center;
		margin-bottom: var(--space-6);
	}
	
	.shield-icon {
		font-size: var(--text-sm);
	}
	
	.participants-grid {
		flex: 1;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-4);
		max-width: 1200px;
		margin: 0 auto;
		width: 100%;
	}
	
	.participant-tile {
		position: relative;
		background: var(--color-bg-dark-2);
		border-radius: var(--radius-lg);
		overflow: hidden;
		aspect-ratio: 16 / 20;
	}
	
	.video-placeholder {
		width: 100%;
		height: 100%;
	}
	
	.participant-label {
		position: absolute;
		bottom: var(--space-4);
		left: var(--space-4);
		background: rgba(0, 0, 0, 0.6);
		color: white;
		padding: var(--space-2) var(--space-3);
		border-radius: var(--radius-sm);
		font-size: var(--text-lg);
		font-weight: 500;
	}
	
	.call-controls {
		display: flex;
		gap: var(--space-4);
		justify-content: center;
		padding: var(--space-6) 0;
	}
	
	.control-button {
		cursor: pointer;
		transition: transform 0.15s ease;
	}
	
	.control-button:hover {
		transform: scale(1.05);
	}
	
	.control-icon {
		width: 56px;
		height: 56px;
		border-radius: var(--radius-full);
		background: var(--color-bg-white);
	}
	
	.control-button.hangup .control-icon {
		background: #DC2626;
	}
</style>
