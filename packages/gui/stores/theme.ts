export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(true);
  const themeLabel = computed(() => (isDark.value ? 'dark mode' : 'light mode'));
  return {
    isDark,
    themeLabel,
  };
});
