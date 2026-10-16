import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import adapter from '@sveltejs/adapter-static';
import { fileURLToPath } from 'url';

export default defineConfig({
	plugins: [sveltekit({
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		alias: {
			'#lib': fileURLToPath(new URL('./src/lib', import.meta.url))
		}
	})]
});
