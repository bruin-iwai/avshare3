import { createVuetify } from 'vuetify';
import { lightTheme, darkTheme } from '~/helpers/vuetify/themes';

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'dark',
      themes: {
        light: lightTheme,
        dark: darkTheme,
      },
      variations: {
        colors: ['primary', 'secondary', 'accent'],
        lighten: 9,
        darken: 9,
      },
    },
  });

  // Vue.js で Vuetify を使用する
  nuxtApp.vueApp.use(vuetify);
});
