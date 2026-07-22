import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    name: 'api',
    environment: 'node',
    clearMocks: true,
    setupFiles: ['__tests__/setup.ts'],
  },
});
