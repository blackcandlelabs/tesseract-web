<script>
	let { size = 40, color = '#2970D1', name = '', initials = '', square = false } = $props();
	
	const initial = name ? name[0].toUpperCase() : '?';
</script>

<div class="avatar" class:square style="width: {size}px; height: {size}px; background: {color};">
	<span style="font-size: {square ? 24 : size * 0.4}px;">{initials || initial}</span>
</div>

<style>
    .avatar.square {
        border-radius: var(--radius-md);
        color: var(--color-primary);
    }

	.avatar {
		border-radius: var(--radius-full);
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-weight: 600;
		flex-shrink: 0;
	}
</style>
