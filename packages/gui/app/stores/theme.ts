import { defineStore } from 'pinia';
import { useTheme } from 'vuetify';

export const useThemeStore = defineStore('theme', () => {
  const theme = useTheme();

  const isDark = computed({
    get() {
      return theme.global.name.value === 'dark';
    },
    set(newValue) {
      theme.global.name.value = newValue ? 'dark' : 'light';
    },
  });
  const themeLabel = computed(() => (isDark.value ? 'dark mode' : 'light mode'));

  return { isDark, themeLabel };
});
