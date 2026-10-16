<script>
	let { variant = 'default', children } = $props();
</script>

<div class="badge {variant}">
	{@render children()}
</div>

<style>
	.badge {
		display: inline-flex;
		align-items: center;
		gap: var(--space-1);
		padding: 2px 8px;
		border-radius: var(--radius-sm);
		font-size: var(--text-sm);
		font-weight: 500;
	}
	
	.badge.default {
		background: var(--color-bg-light-2);
		color: var(--color-text-secondary);
	}
	
	.badge.encrypted {
		color: var(--color-encryption);
		background: transparent;
	}
	
	.badge.verified {
		color: var(--color-verified);
		background: transparent;
	}
</style>
