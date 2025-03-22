import { coverageConfigDefaults } from 'vitest/config';
import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
  test: {
    name: 'gui',
    environment: 'nuxt',
    clearMocks: true,
    passWithNoTests: true,
    coverage: {
      exclude: [
        ...coverageConfigDefaults.exclude,
        '**/*.vue',
        'nuxt.config.ts',
      ],
    },
  },
});
