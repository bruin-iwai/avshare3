import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineVitestConfig } from '@nuxt/test-utils/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineVitestConfig({
  test: {
    name: 'nuxt',
    include: ['test/nuxt/**/*.{test,spec}.ts'],
    environment: 'nuxt',
    environmentOptions: {
      nuxt: {
        rootDir: __dirname,
      },
    },
  },
});
