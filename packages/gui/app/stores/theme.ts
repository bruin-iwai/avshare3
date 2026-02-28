export const useThemeStore = defineStore('theme', () => {
  const theme = useTheme();

  const currentTheme = computed(() => theme.global.name.value);

  const isDark = computed({
    get() {
      return theme.global.name.value === 'dark';
    },
    set(newValue) {
      theme.global.name.value = newValue ? 'dark' : 'light';
    },
  });

  return { currentTheme, isDark };
});
