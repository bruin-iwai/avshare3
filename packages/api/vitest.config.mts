import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    name: 'api',
    environment: 'node',
    setupFiles: ['__tests__/setup.ts'],
  },
});
