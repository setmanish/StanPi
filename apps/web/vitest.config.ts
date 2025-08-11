import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '@stanpi/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@stanpi/data': path.resolve(__dirname, '../../packages/data/src'),
    },
  },
  esbuild: {
    jsx: 'automatic',
  },
});
