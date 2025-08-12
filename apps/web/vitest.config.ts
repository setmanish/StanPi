import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    exclude: ['e2e/**'],
    include: ['tests/**/*.test.ts'],
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
