import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import Vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    Vue(),
    AutoImport({
      imports: [
        'vue',
        'pinia',
        // {
        //   '#app': ['useRuntimeConfig'],
        // },
      ],
    }),
  ],
  test: {
    name: 'gui',
    environment: 'happy-dom',
    clearMocks: true,
    passWithNoTests: true,
    setupFiles: ['__tests__/setup.ts'],
  },
});
