<script>
	import Avatar from './Avatar.svelte';
	
	let { 
		sender = '', 
		time = '', 
		content = '', 
		color = '#2970D1' 
	} = $props();
</script>

<div class="message">
	<Avatar {color} name={sender} size={36} />
	<div class="message-content">
		<div class="message-header">
			<span class="sender">{sender}</span>
			<span class="time">{time}</span>
		</div>
		<div class="message-text">{content}</div>
	</div>
</div>

<style>
	.message {
		display: flex;
		gap: var(--space-3);
		padding: var(--space-3) var(--space-6);
	}
	
	.message-content {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}
	
	.message-header {
		display: flex;
		align-items: center;
		gap: var(--space-2);
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
</style>
