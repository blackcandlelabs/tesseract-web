<script>
	import Avatar from '#lib/components/Avatar.svelte';
	import Badge from '#lib/components/Badge.svelte';
	import Message from '#lib/components/Message.svelte';
	import Input from '#lib/components/Input.svelte';
	import Button from '#lib/components/Button.svelte';
	
	const messages = [
		{ sender: 'Alice', time: '2:30 PM', content: 'Just pushed the encryption key rotation fix. Verify shields show correctly in verified rooms?', color: '#8B5CF6' },
		{ sender: 'Bob', time: '2:35 PM', content: 'Checking now. Shield is green, verified state shows in header. Looking good!', color: '#16A34A' },
		{ sender: 'Charlie', time: '2:40 PM', content: 'Also confirmed on desktop. E2EE indicator working as expected.', color: '#F59E0B' },
		{ sender: 'Alice', time: '2:45 PM', content: 'Perfect. Deploy ready for review. UnifiedPush notifications working well too.', color: '#8B5CF6' }
	];
	
	let messageText = $state('');
</script>

<div class="conversation-page">
	<div class="conversation-header">
		<div class="room-info">
			<Avatar color="#16A34A" name="#engineering" size={32} />
			<div class="room-details">
				<h1>#engineering</h1>
				<Badge variant="encrypted">
					<div class="shield-icon">🛡️</div>
					Encrypted · 4 members
				</Badge>
			</div>
		</div>
		<Button variant="ghost">Call</Button>
	</div>
	
	<div class="messages-container">
		{#each messages as message}
			<Message {...message} />
		{/each}
	</div>
	
	<div class="message-composer">
		<div class="composer-input">
			<Input bind:value={messageText} placeholder="Type a message..." />
		</div>
		<Button variant="primary">Send</Button>
	</div>
</div>

<style>
	.conversation-page {
		height: 100vh;
		display: flex;
		flex-direction: column;
		background: var(--color-bg-white);
	}
	
	.conversation-header {
		height: 64px;
		padding: 0 var(--space-6);
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid var(--color-border-light);
	}
	
	.room-info {
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}
	
	.room-details {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}
	
	.room-details h1 {
		font-size: var(--text-xl);
		font-weight: 600;
		color: var(--color-text-primary);
	}
	
	.shield-icon {
		font-size: var(--text-xs);
	}
	
	.messages-container {
		flex: 1;
		overflow-y: auto;
		padding: var(--space-6) 0;
	}
	
	.message-composer {
		padding: var(--space-4) var(--space-6);
		border-top: 1px solid var(--color-border-light);
		display: flex;
		gap: var(--space-4);
		align-items: center;
	}
	
	.composer-input {
		flex: 1;
	}
</style>
