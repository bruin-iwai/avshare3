import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { type Config, defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import withNuxt from './packages/gui/.nuxt/eslint.config.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default (async (): Promise<Config[]> => {
  const apiConfigs = defineConfig([
    {
      files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
      plugins: { js },
      extends: ['js/recommended'],
      languageOptions: {
        globals: {
          ...globals.node,
          ...globals.vitest,
        },
        parserOptions: {
          project: './tsconfig.json',
          tsconfigRootDir: path.resolve(__dirname, 'packages/api'),
        },
      },
      linterOptions: {
        noInlineConfig: false,
        reportUnusedDisableDirectives: 'error',
        reportUnusedInlineConfigs: 'error',
      },
    },
    tseslint.configs.recommended,
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
