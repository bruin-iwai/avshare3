import { defineConfig, coverageConfigDefaults } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineVitestProject } from '@nuxt/test-utils/config';

export default defineConfig({
  test: {
    projects: [
      {
        plugins: [tsconfigPaths()],
        test: {
          root: 'packages/api',
          name: 'api',
          environment: 'node',
          clearMocks: true,
          setupFiles: ['__tests__/setup.ts'],
        },
      },
      await defineVitestProject({
        plugins: [tsconfigPaths()],
        test: {
          root: 'packages/gui',
          name: 'gui',
          environment: 'nuxt',
          environmentOptions: {
            nuxt: {
              rootDir: 'packages/gui',
            },
          },
          clearMocks: true,
          // workarounds:
          // https://github.com/nuxt/test-utils/blob/main/src/config.ts
          // で resolvedConfig の test/dir が process.cwd() になっているため
          // テストファイルの探索起点が packages/gui/ ではなく ./ になってしまっている。
          // このままだと packages/api/ 配下のテストファイルも対象になってエラーになるので、
          // include で packages/gui/ だけが対象であることを明示する。
          include: ['./packages/gui/__tests__/**/*.test.ts'],
        },
      }),
    ],
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
      ],
    },
  },
});
