<script>
	let { variant = 'primary', children, ...props } = $props();
</script>

<button class="button {variant}" {...props}>
	{@render children()}
</button>

<style>
	.button {
		padding: 13px 24px;
		border-radius: var(--radius-md);
		font-size: var(--text-lg);
		font-weight: 500;
		transition: all 0.15s ease;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
	}
	
	.button.primary {
		background: var(--color-primary);
		color: white;
	}
	
	.button.primary:hover {
		background: var(--color-primary-hover);
	}
	
	.button.secondary {
		background: var(--color-bg-light-2);
		color: var(--color-text-primary);
	}
	
	.button.secondary:hover {
		background: var(--color-border);
	}
	
	.button.ghost {
		background: transparent;
		color: var(--color-text-secondary);
		padding: 7px 12px;
	}
	
	.button.ghost:hover {
		background: var(--color-bg-light-1);
	}
</style>
