<script>
	import RoomListItem from '#lib/components/RoomListItem.svelte';
	
	const workspaces = [
		{ name: 'Black Candle', color: '#2970D1' },
		{ name: 'Personal', color: '#16A34A' },
		{ name: 'Community', color: '#DC2626' }
	];
	
	const rooms = [
		{ name: '#general', preview: 'Alice: Deploy is ready for review', time: '2:45 PM', color: '#2970D1', unread: false },
		{ name: '#engineering', preview: 'Bob: Encryption keys rotated ✓', time: '1:20 PM', color: '#16A34A', unread: true },
		{ name: '#design', preview: 'Charlie: New mockups in Figma', time: '12:08 PM', color: '#F59E0B', unread: false },
		{ name: 'Alice Thompson', preview: 'Thanks for reviewing!', time: 'Yesterday', color: '#8B5CF6', unread: false },
		{ name: '#security', preview: 'Eve: UnifiedPush setup complete', time: 'Yesterday', color: '#DC2626', unread: false }
	];
</script>

<div class="chat-list-page">
	<div class="sidebar">
		{#each workspaces as workspace}
			<div class="workspace-icon" style="background: {workspace.color};">
				{workspace.name[0]}
			</div>
		{/each}
	</div>
	
	<div class="room-list">
		<div class="room-list-header">
			<h1>Black Candle</h1>
		</div>
		<div class="rooms">
			{#each rooms as room}
				<RoomListItem {...room} />
			{/each}
		</div>
	</div>
	
	<div class="main-panel">
		<div class="empty-state">
			<p>Select a room or DM to start messaging</p>
		</div>
	</div>
</div>

<style>
	.chat-list-page {
		height: 100vh;
		display: flex;
		background: var(--color-bg-white);
	}
	
	.sidebar {
		width: 72px;
		background: var(--color-bg-light-2);
		border-right: 1px solid var(--color-border-light);
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: var(--space-4) 0;
		gap: var(--space-2);
	}
	
	.workspace-icon {
		width: 48px;
		height: 48px;
		border-radius: var(--radius-full);
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-weight: 600;
		font-size: var(--text-lg);
		cursor: pointer;
		transition: transform 0.15s ease;
	}
	
	.workspace-icon:hover {
		transform: scale(1.05);
	}
	
	.room-list {
		width: 360px;
		background: var(--color-bg-white);
		border-right: 1px solid var(--color-border-light);
		display: flex;
		flex-direction: column;
	}
	
	.room-list-header {
		padding: var(--space-5) var(--space-4);
		border-bottom: 1px solid var(--color-border-light);
	}
	
	.room-list-header h1 {
		font-size: var(--text-xl);
		font-weight: 600;
		color: var(--color-text-primary);
	}
	
	.rooms {
		flex: 1;
		overflow-y: auto;
	}
	
	.main-panel {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-bg-light-1);
	}
	
	.empty-state p {
		font-size: var(--text-lg);
		color: var(--color-text-tertiary);
	}
</style>
