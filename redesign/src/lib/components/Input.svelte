<script>
	let { placeholder = '', value = $bindable(''), ...props } = $props();
</script>

<div class="input-wrapper">
	<input bind:value {placeholder} {...props} />
</div>

<style>
	.input-wrapper {
		background: var(--color-bg-light-2);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border-light);
		transition: all 0.15s ease;
	}
	
	.input-wrapper:focus-within {
		border-color: var(--color-primary);
		background: var(--color-bg-white);
	}
	
	input {
		width: 100%;
		padding: 15px 17px;
		background: transparent;
		color: var(--color-text-primary);
		font-size: var(--text-lg);
	}
	
	input::placeholder {
		color: var(--color-text-tertiary);
	}
</style>
