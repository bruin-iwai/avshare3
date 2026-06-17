import { useTheme } from 'vuetify';

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(true);

  const theme = useTheme();
  const currentTheme = computed(() => theme.global.name.value);

  watch(isDark, (newValue) => {
    theme.global.name.value = newValue ? 'dark' : 'light';
  });

  return { currentTheme, isDark };
});
