<script>
	let { size = 40, color = '#2970D1', name = '' } = $props();
	
	const initial = name ? name[0].toUpperCase() : '?';
</script>

<div class="avatar" style="width: {size}px; height: {size}px; background: {color};">
	<span style="font-size: {size * 0.4}px;">{initial}</span>
</div>

<style>
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
