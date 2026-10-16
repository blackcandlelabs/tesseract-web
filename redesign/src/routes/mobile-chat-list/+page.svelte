<script>
	import RoomListItem from '#lib/components/RoomListItem.svelte';
	
	const rooms = [
		{ name: '#general', preview: 'Alice: Deploy is ready for review', time: '2:45 PM', color: '#2970D1', unread: false },
		{ name: '#engineering', preview: 'Bob: Keys rotated ✓', time: '1:20 PM', color: '#16A34A', unread: true },
		{ name: '#design', preview: 'Charlie: New mockups', time: '12:08 PM', color: '#F59E0B', unread: false },
		{ name: 'Alice Thompson', preview: 'Thanks for reviewing!', time: 'Yesterday', color: '#8B5CF6', unread: false },
		{ name: '#security', preview: 'Eve: UnifiedPush setup done', time: 'Yesterday', color: '#DC2626', unread: false }
	];
</script>

<div class="mobile-chat-list">
	<div class="mobile-header">
		<h1>Black Candle</h1>
		<div class="menu-icon"></div>
	</div>
	
	<div class="mobile-rooms">
		{#each rooms as room}
			<RoomListItem {...room} />
		{/each}
	</div>
</div>

<style>
	.mobile-chat-list {
		max-width: 412px;
		margin: 0 auto;
		min-height: 100vh;
		background: var(--color-bg-white);
		border-left: 1px solid var(--color-border-light);
		border-right: 1px solid var(--color-border-light);
		display: flex;
		flex-direction: column;
	}
	
	.mobile-header {
		height: 56px;
		padding: 0 var(--space-4);
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid var(--color-border-light);
	}
	
	.mobile-header h1 {
		font-size: var(--text-xl);
		font-weight: 600;
		color: var(--color-text-primary);
	}
	
	.menu-icon {
		width: 24px;
		height: 24px;
		background: var(--color-bg-light-2);
		border-radius: var(--radius-sm);
	}
	
	.mobile-rooms {
		flex: 1;
	}
</style>
