import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		proxy: process.env.NODE_ENV === 'development' ? {
			'/api': 'http://localhost:8080',
			'/health': 'http://localhost:8080'
		} : {},
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
