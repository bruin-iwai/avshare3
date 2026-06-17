import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@pinia/nuxt', '@nuxt/test-utils/module'],

  runtimeConfig: {
    public: {
      apiBase: '/api',
    },
  },

  ssr: false,

  typescript: {
    typeCheck: true,
  },

  devServer: {
    host: 'localhost',
    port: 4000,
  },

  build: {
    transpile: ['vuetify'],
  },

  vite: {
    plugins: [
      vuetify({
        autoImport: true,
      }),
    ],
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    server: {
      hmr: {
        // Nuxt DevTools の制約により devServer.port と同じ値にする
        // port: 24678,
        port: 4000,
      },
    },
  },

  compatibilityDate: '2025-03-15',
});
