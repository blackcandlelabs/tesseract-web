<script>
	import Avatar from './Avatar.svelte';
	
	let { 
		name = '', 
		preview = '', 
		time = '', 
		color = '#2970D1',
		unread = false,
		active = false 
	} = $props();
</script>

<div class="room-item" class:active>
	<Avatar {color} {name} size={40} />
	<div class="content">
		<div class="header">
			<span class="name">{name}</span>
			<span class="time">{time}</span>
		</div>
		<div class="preview-line">
			<span class="preview">{preview}</span>
			{#if unread}
				<div class="unread-badge"></div>
			{/if}
		</div>
	</div>
</div>

<style>
	.room-item {
		display: flex;
		gap: var(--space-3);
		padding: var(--space-3);
		cursor: pointer;
		transition: background 0.15s ease;
	}
	
	.room-item:hover {
		background: var(--color-bg-light-1);
	}
	
	.room-item.active {
		background: var(--color-bg-light-2);
	}
	
	.content {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}
	
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: var(--space-2);
	}
	
	.name {
		font-size: var(--text-lg);
		font-weight: 500;
		color: var(--color-text-primary);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.time {
		font-size: var(--text-sm);
		color: var(--color-text-tertiary);
		flex-shrink: 0;
	}
	
	.preview-line {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: var(--space-2);
	}
	
	.preview {
		font-size: var(--text-md);
		color: var(--color-text-secondary);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.unread-badge {
		width: 8px;
		height: 8px;
		border-radius: var(--radius-full);
		background: var(--color-unread);
		flex-shrink: 0;
	}
</style>
