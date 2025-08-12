import { defineConfig } from '@playwright/test';

export default defineConfig({
  webServer: {
    command: 'pnpm dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
    cwd: __dirname,
  },
  use: { baseURL: 'http://localhost:3000' },
  testDir: './e2e',
});
