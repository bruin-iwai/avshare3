// cf) https://codybontecou.com/how-to-use-vuetify-with-nuxt-3.html
//     https://zenn.dev/coedo/articles/nuxt3-vuetify3
import vuetify from 'vite-plugin-vuetify';

export default defineNuxtConfig({
  build: {
    transpile: ['vuetify'],
  },

  css: ['vuetify/lib/styles/main.sass'],

  hooks: {
    'vite:extendConfig': (config) => {
      config.plugins!.push(vuetify());
    },
  },

  modules: ['@nuxt/eslint'],

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
    ssr: {
      noExternal: ['vuetify'],
    },
    define: {
      'process.env.DEBUG': false,
    },
    server: {
      hmr: {
        port: 24678,
      },
    },
  },
});
