import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    name: 'api',
    environment: 'node',
    clearMocks: true,
    passWithNoTests: true,
    setupFiles: ['__tests__/setup.ts'],
  },
});
