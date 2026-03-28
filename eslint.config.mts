import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { type Config, defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import withNuxt from './packages/gui/.nuxt/eslint.config.mjs';

export default (async (): Promise<Config[]> => {
  const apiConfigs = defineConfig([
    eslint.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    {
      languageOptions: {
        parserOptions: {
          projectService: true,
        },
        globals: {
          ...globals.node,
          ...globals.vitest,
        },
      },
    },
    {
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            args: 'all',
            argsIgnorePattern: '^_',
            caughtErrors: 'all',
            caughtErrorsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            ignoreRestSiblings: true,
          },
        ],
      },
    },
  ]);

  const guiConfigs = await withNuxt({
    files: ['**/*.{ts.vue}'],
    rules: {
      'no-console': 'off',
    },
  });

  return defineConfig([
    globalIgnores(['coverage/', '**/*.d.ts', '**/.aws-sam/', '**/dist/', '**/build.mjs']),
    {
      name: 'configForApi',
      basePath: 'packages/api',
      extends: apiConfigs,
    },
    {
      name: 'configForGui',
      basePath: 'packages/gui',
      extends: guiConfigs,
    },
    eslintConfigPrettier,
  ]);
})();
