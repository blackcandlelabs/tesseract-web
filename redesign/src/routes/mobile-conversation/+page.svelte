<script>
	import Avatar from '#lib/components/Avatar.svelte';
	import Badge from '#lib/components/Badge.svelte';
	import Message from '#lib/components/Message.svelte';
	
	const messages = [
		{ sender: 'Alice', time: '2:30 PM', content: 'Just pushed the encryption fix. Verify shields?', color: '#8B5CF6' },
		{ sender: 'Bob', time: '2:35 PM', content: 'Checking. Shield green, looks good!', color: '#16A34A' },
		{ sender: 'Charlie', time: '2:40 PM', content: 'Confirmed on desktop too.', color: '#F59E0B' },
		{ sender: 'Alice', time: '2:45 PM', content: 'Perfect. Deploy is ready.', color: '#8B5CF6' }
	];
</script>

<div class="mobile-conversation">
	<div class="mobile-header">
		<div class="back-button"></div>
		<div class="room-info">
			<Avatar color="#16A34A" name="#engineering" size={32} />
			<div class="room-details">
				<h1>#engineering</h1>
				<Badge variant="encrypted">
					<div class="shield-icon">🛡️</div>
					Encrypted
				</Badge>
			</div>
		</div>
	</div>
	
	<div class="mobile-messages">
		{#each messages as message}
			<div class="mobile-message">
				<Avatar color={message.color} name={message.sender} size={32} />
				<div class="message-content">
					<div class="message-header">
						<span class="sender">{message.sender}</span>
						<span class="time">{message.time}</span>
					</div>
					<div class="message-text">{message.content}</div>
				</div>
			</div>
		{/each}
	</div>
	
	<div class="mobile-composer">
		<div class="composer-input">
			<input type="text" placeholder="Message" />
		</div>
		<div class="send-button"></div>
	</div>
</div>

<style>
	.mobile-conversation {
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
		padding: 0 var(--space-3);
		display: flex;
		align-items: center;
		gap: var(--space-3);
		border-bottom: 1px solid var(--color-border-light);
	}
	
	.back-button {
		width: 24px;
		height: 24px;
		background: var(--color-bg-light-2);
		border-radius: var(--radius-sm);
		flex-shrink: 0;
	}
	
	.room-info {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		flex: 1;
	}
	
	.room-details {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	
	.room-details h1 {
		font-size: var(--text-xl);
		font-weight: 600;
		color: var(--color-text-primary);
		line-height: 1.2;
	}
	
	.shield-icon {
		font-size: 10px;
	}
	
	.mobile-messages {
		flex: 1;
		padding: var(--space-4) var(--space-3);
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}
	
	.mobile-message {
		display: flex;
		gap: var(--space-2);
	}
	
	.message-content {
		flex: 1;
		min-width: 0;
	}
	
	.message-header {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		margin-bottom: var(--space-1);
	}
	
	.sender {
		font-size: var(--text-lg);
		font-weight: 600;
		color: var(--color-text-primary);
	}
	
	.time {
		font-size: var(--text-sm);
		color: var(--color-text-tertiary);
	}
	
	.message-text {
		font-size: var(--text-lg);
		color: var(--color-text-primary);
		line-height: 1.5;
	}
	
	.mobile-composer {
		padding: var(--space-3);
		border-top: 1px solid var(--color-border-light);
		display: flex;
		gap: var(--space-3);
		align-items: center;
	}
	
	.composer-input {
		flex: 1;
		background: var(--color-bg-light-2);
		border-radius: var(--radius-md);
		padding: var(--space-3) var(--space-4);
	}
	
	.composer-input input {
		width: 100%;
		background: transparent;
		border: none;
		outline: none;
		font-size: var(--text-lg);
		color: var(--color-text-primary);
	}
	
	.composer-input input::placeholder {
		color: var(--color-text-tertiary);
	}
	
	.send-button {
		width: 48px;
		height: 48px;
		background: var(--color-primary);
		border-radius: var(--radius-full);
		flex-shrink: 0;
		cursor: pointer;
		transition: background 0.15s ease;
	}
	
	.send-button:hover {
		background: var(--color-primary-hover);
	}
</style>
