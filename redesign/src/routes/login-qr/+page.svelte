<script>
	// QR code pattern - static decorative SVG grid with finder squares
	const qrSize = 25; // 25x25 module grid
	
	// Generate a static decorative QR pattern
	function generateQRPattern() {
		const pattern = [];
		for (let y = 0; y < qrSize; y++) {
			for (let x = 0; x < qrSize; x++) {
				// Finder patterns (top-left, top-right, bottom-left)
				const isFinderPattern = 
					(x < 7 && y < 7) || // top-left
					(x >= qrSize - 7 && y < 7) || // top-right
					(x < 7 && y >= qrSize - 7); // bottom-left
				
				if (isFinderPattern) continue;
				
				// Random-ish decorative pattern (deterministic)
				const shouldFill = ((x + y * 7) % 3 === 0) || ((x * 11 + y) % 5 === 0);
				if (shouldFill) {
					pattern.push({ x, y });
				}
			}
		}
		return pattern;
	}
	
	const modules = generateQRPattern();
</script>

<div class="login-qr-page">
	<div class="login-qr-container">
		<div class="header">
			<div class="logo"></div>
			<h1>Sign in with QR Code</h1>
			<p class="instructions">
				Scan this QR code with the Tesseract mobile app to sign in instantly
			</p>
		</div>
		
		<div class="qr-container">
			<svg viewBox="0 0 {qrSize} {qrSize}" class="qr-code">
				<!-- Finder pattern: top-left -->
				<rect x="0" y="0" width="7" height="7" fill="black" />
				<rect x="1" y="1" width="5" height="5" fill="white" />
				<rect x="2" y="2" width="3" height="3" fill="black" />
				
				<!-- Finder pattern: top-right -->
				<rect x="{qrSize - 7}" y="0" width="7" height="7" fill="black" />
				<rect x="{qrSize - 6}" y="1" width="5" height="5" fill="white" />
				<rect x="{qrSize - 5}" y="2" width="3" height="3" fill="black" />
				
				<!-- Finder pattern: bottom-left -->
				<rect x="0" y="{qrSize - 7}" width="7" height="7" fill="black" />
				<rect x="1" y="{qrSize - 6}" width="5" height="5" fill="white" />
				<rect x="2" y="{qrSize - 5}" width="3" height="3" fill="black" />
				
				<!-- Data modules -->
				{#each modules as { x, y }}
					<rect {x} {y} width="1" height="1" fill="black" />
				{/each}
			</svg>
		</div>
		
		<div class="session-info">
			<p class="session-id">
				<span class="label">Session ID:</span>
				<span class="mono">session_abc123def456</span>
			</p>
			<p class="expires">Code expires in 4:58</p>
		</div>
		
		<p class="alternative">
			<a href="/login">Use password instead</a>
		</p>
	</div>
</div>

<style>
	.login-qr-page {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-bg-light-1);
		padding: var(--space-6);
	}
	
	.login-qr-container {
		max-width: 480px;
		width: 100%;
		background: var(--color-bg-white);
		border-radius: var(--radius-lg);
		padding: var(--space-12) var(--space-8);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		text-align: center;
	}
	
	.logo {
		width: 48px;
		height: 48px;
		background: var(--color-primary);
		border-radius: var(--radius-md);
		margin: 0 auto var(--space-3);
	}
	
	h1 {
		font-size: var(--text-2xl);
		font-weight: 700;
		color: var(--color-text-primary);
		margin-bottom: var(--space-3);
	}
	
	.instructions {
		font-size: var(--text-base);
		color: var(--color-text-secondary);
		line-height: 1.5;
		margin-bottom: var(--space-8);
	}
	
	.qr-container {
		width: 256px;
		height: 256px;
		margin: 0 auto var(--space-6);
		padding: var(--space-4);
		background: white;
		border: 2px solid var(--color-border-light);
		border-radius: var(--radius-md);
	}
	
	.qr-code {
		width: 100%;
		height: 100%;
		shape-rendering: crispEdges;
	}
	
	.session-info {
		margin-bottom: var(--space-6);
	}
	
	.session-id {
		margin-bottom: var(--space-2);
	}
	
	.label {
		font-size: var(--text-sm);
		color: var(--color-text-secondary);
		display: block;
		margin-bottom: var(--space-1);
	}
	
	.mono {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-text-primary);
		background: var(--color-bg-light-2);
		padding: var(--space-2) var(--space-3);
		border-radius: var(--radius-sm);
		display: inline-block;
	}
	
	.expires {
		font-size: var(--text-sm);
		color: var(--color-text-tertiary);
	}
	
	.alternative {
		margin-top: var(--space-6);
		padding-top: var(--space-6);
		border-top: 1px solid var(--color-border-light);
	}
	
	.alternative a {
		color: var(--color-primary);
		text-decoration: none;
		font-size: var(--text-base);
	}
	
	.alternative a:hover {
		text-decoration: underline;
	}
</style>
