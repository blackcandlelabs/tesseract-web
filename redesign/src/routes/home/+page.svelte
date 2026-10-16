<script>
	import RoomListItem from '#lib/components/RoomListItem.svelte';
	
	// Full space set with proper colors
	const spaces = [
		{ name: 'Black Candle', color: '#2970D1', active: true },
		{ name: 'Engineering', color: '#16A34A', active: false },
		{ name: 'Design', color: '#F59E0B', active: false },
		{ name: 'Security', color: '#DC2626', active: false },
		{ name: 'Product', color: '#8B5CF6', active: false },
		{ name: 'Marketing', color: '#EC4899', active: false }
	];
	
	const rooms = [
		{ name: '#general', preview: 'Alice: Deploy is ready for review', time: '2:45 PM', color: '#2970D1', unread: false },
		{ name: '#engineering', preview: 'Bob: Encryption keys rotated ✓', time: '1:20 PM', color: '#16A34A', unread: true },
		{ name: '#design', preview: 'Charlie: New mockups in Figma', time: '12:08 PM', color: '#F59E0B', unread: false },
		{ name: 'Alice Thompson', preview: 'Thanks for reviewing!', time: 'Yesterday', color: '#8B5CF6', unread: false },
		{ name: '#security', preview: 'Eve: UnifiedPush setup complete', time: 'Yesterday', color: '#DC2626', unread: false }
	];
</script>

<div class="home-page">
	<!-- Full-height spaces rail -->
	<div class="spaces-rail">
		{#each spaces as space}
			<div class="space-item" class:active={space.active}>
				<div class="space-avatar" style="background: {space.color};">
					{space.name[0]}
				</div>
				{#if space.active}
					<div class="active-indicator"></div>
				{/if}
			</div>
		{/each}
		<div class="space-add">
			<div class="add-button">+</div>
		</div>
	</div>
	
	<!-- Room list -->
	<div class="room-list">
		<div class="room-list-header">
			<h1>Black Candle</h1>
			<button class="search-button">🔍</button>
		</div>
		<div class="rooms">
			{#each rooms as room}
				<RoomListItem {...room} />
			{/each}
		</div>
	</div>
	
	<!-- Main panel -->
	<div class="main-panel">
		<div class="empty-state">
			<p>Select a room or DM to start messaging</p>
		</div>
	</div>
</div>

<style>
	.home-page {
		height: 100vh;
		display: flex;
		background: var(--color-bg-white);
	}
	
	.spaces-rail {
		width: 72px;
		background: var(--color-bg-light-2);
		border-right: 1px solid var(--color-border-light);
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: var(--space-4) 0;
		gap: var(--space-2);
		overflow-y: auto;
	}
	
	.space-item {
		position: relative;
		cursor: pointer;
	}
	
	.space-avatar {
		width: 48px;
		height: 48px;
		border-radius: var(--radius-full);
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-weight: 600;
		font-size: var(--text-lg);
		transition: transform 0.15s ease, border-radius 0.15s ease;
	}
	
	.space-item:hover .space-avatar {
		transform: scale(1.05);
		border-radius: var(--radius-lg);
	}
	
	.space-item.active .space-avatar {
		border-radius: var(--radius-lg);
	}
	
	.active-indicator {
		position: absolute;
		left: -8px;
		top: 50%;
		transform: translateY(-50%);
		width: 4px;
		height: 32px;
		background: var(--color-primary);
		border-radius: 0 4px 4px 0;
	}
	
	.space-add {
		margin-top: var(--space-2);
		padding-top: var(--space-2);
		border-top: 1px solid var(--color-border);
		width: 100%;
		display: flex;
		justify-content: center;
	}
	
	.add-button {
		width: 48px;
		height: 48px;
		border-radius: var(--radius-full);
		background: var(--color-bg-light-1);
		border: 2px dashed var(--color-border);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24px;
		color: var(--color-text-secondary);
		cursor: pointer;
		transition: all 0.15s ease;
	}
	
	.add-button:hover {
		background: var(--color-bg-white);
		border-color: var(--color-primary);
		color: var(--color-primary);
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
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.room-list-header h1 {
		font-size: var(--text-xl);
		font-weight: 600;
		color: var(--color-text-primary);
	}
	
	.search-button {
		width: 32px;
		height: 32px;
		border-radius: var(--radius-sm);
		display: flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		transition: background 0.15s ease;
	}
	
	.search-button:hover {
		background: var(--color-bg-light-1);
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
