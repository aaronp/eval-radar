import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

import ClosePlugin from './vite-plugin-close'

export default defineConfig({
	plugins: [sveltekit(), ClosePlugin()],

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
