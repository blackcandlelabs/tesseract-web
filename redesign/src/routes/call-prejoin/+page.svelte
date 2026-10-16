<script>
	import Button from '#lib/components/Button.svelte';
	import Badge from '#lib/components/Badge.svelte';
</script>

<div class="call-prejoin-page">
	<div class="preview-container">
		<div class="video-preview">
			<div class="preview-placeholder">Camera preview</div>
		</div>
		
		<div class="call-info">
			<h1>#engineering</h1>
			<Badge variant="encrypted">
				<div class="shield-icon">🛡️</div>
				End-to-end encrypted call
			</Badge>
		</div>
		
		<div class="controls">
			<div class="control-button">
				<div class="control-icon"></div>
				<span>Microphone</span>
			</div>
			<div class="control-button">
				<div class="control-icon"></div>
				<span>Camera</span>
			</div>
		</div>
		
		<Button variant="primary">Join call</Button>
	</div>
</div>

<style>
	.call-prejoin-page {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-bg-light-1);
		padding: var(--space-6);
	}
	
	.preview-container {
		width: 100%;
		max-width: 640px;
		display: flex;
		flex-direction: column;
		gap: var(--space-5);
	}
	
	.video-preview {
		width: 100%;
		aspect-ratio: 4 / 3;
		background: var(--color-bg-dark);
		border-radius: var(--radius-lg);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.preview-placeholder {
		color: var(--color-text-tertiary);
		font-size: var(--text-lg);
	}
	
	.call-info {
		text-align: center;
	}
	
	.call-info h1 {
		font-size: var(--text-2xl);
		font-weight: 600;
		color: var(--color-text-primary);
		margin-bottom: var(--space-2);
	}
	
	.shield-icon {
		font-size: var(--text-sm);
	}
	
	.controls {
		display: flex;
		gap: var(--space-4);
		justify-content: center;
	}
	
	.control-button {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-2);
		cursor: pointer;
	}
	
	.control-icon {
		width: 56px;
		height: 56px;
		background: var(--color-bg-white);
		border: 2px solid var(--color-border);
		border-radius: var(--radius-full);
		transition: all 0.15s ease;
	}
	
	.control-button:hover .control-icon {
		border-color: var(--color-primary);
		background: var(--color-bg-light-1);
	}
	
	.control-button span {
		font-size: var(--text-sm);
		color: var(--color-text-secondary);
	}
</style>
