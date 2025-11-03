import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins!.push(vuetify({ autoImport: true }));
      });
    },
  ],

  runtimeConfig: {
    public: {
      apiBase: '/api',
    },
  },

  ssr: false,

  typescript: {
    typeCheck: true,
  },

  // This config needs vue-tsc
  // https://nuxt.com/docs/4.x/guide/concepts/typescript
  build: {
    transpile: ['vuetify'],
  },

  vite: {
    define: {
      'process.env.DEBUG': false,
    },
    server: {
      hmr: {
        port: 24678,
      },
    },
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  compatibilityDate: '2025-03-15',
});
