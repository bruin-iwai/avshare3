export default defineNuxtConfig({
  modules: ['@nuxt/eslint', 'vuetify-nuxt-module', '@pinia/nuxt'],

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
    },
  },

  ssr: false,

  typescript: {
    typeCheck: true,
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
  },

  compatibilityDate: '2025-03-15',
});
