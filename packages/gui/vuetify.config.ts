import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration';

export default defineVuetifyConfiguration({
  theme: {
    defaultTheme: 'dark',
    themes: {
      light: {
        dark: false,
        colors: {
          background: '#FFFFFF',
          surface: '#FFFFFF',
          primary: '#4f46e5',
          secondary: '#9333ea',
          error: '#ef4444',
          info: '#3b82f6',
          success: '#22c55e',
          warning: '#f59e0b',
        },
      },
      dark: {
        dark: true,
        colors: {
          background: '#0C111B',
          surface: '#1f2937',
          primary: '#6366f1',
          secondary: '#9333ea',
          error: '#ef4444',
          info: '#3b82f6',
          success: '#22c55e',
          warning: '#f59e0b',
        },
      },
    },
    variations: {
      colors: ['primary', 'secondary', 'accent'],
      lighten: 9,
      darken: 9,
    },
  },
});
