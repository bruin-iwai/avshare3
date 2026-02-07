export default defineNuxtConfig({
  modules: ['@nuxt/eslint', 'vuetify-nuxt-module'],

  runtimeConfig: {
    public: {
      apiBase: '/api',
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
