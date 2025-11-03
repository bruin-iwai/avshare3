import { defineConfig, coverageConfigDefaults } from 'vitest/config';

export default defineConfig({
  test: {
    projects: ['packages/api'],
    coverage: {
      exclude: [
        ...coverageConfigDefaults.exclude,
        'packages/api/.aws-sam/**',
        'packages/api/coverage/**',
        'packages/api/dist/**',
        'packages/api/build.mjs',
        'packages/api/src/index.ts',
        'packages/api/src/standalone.ts',
        'packages/gui/coverage/**',
        'packages/gui/**/*.vue',
        'packages/gui/nuxt.config.ts',
        'packages/gui/app/plugins/vuetify.ts',
      ],
    },
  },
});
