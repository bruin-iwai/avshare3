import { defineConfig, coverageConfigDefaults } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    name: 'api',
    environment: 'node',
    clearMocks: true,
    passWithNoTests: true,
    setupFiles: ['__tests__/setup.ts'],
    coverage: {
      exclude: [
        ...coverageConfigDefaults.exclude,
        '.aws-sam/**',
        'dist/**',
        'build.mjs',
        'src/index.ts',
        'src/standalone.ts',
      ],
    },
  },
});
