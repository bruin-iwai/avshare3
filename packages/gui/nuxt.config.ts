export default defineNuxtConfig({
  modules: ['@nuxt/eslint', 'vuetify-nuxt-module', '@pinia/nuxt', '@nuxt/test-utils/module'],

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

  vite: {
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
