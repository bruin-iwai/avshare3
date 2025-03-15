import { defineConfig, coverageConfigDefaults } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      exclude: [
        ...coverageConfigDefaults.exclude,
        'packages/api/.aws-sam/**',
        'packages/api/dist/**',
        'packages/api/build.mjs',
        'packages/api/src/index.ts',
        'packages/api/src/standalone.ts',
      ],
    },
  },
});
