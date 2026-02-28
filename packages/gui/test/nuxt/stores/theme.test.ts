import { setActivePinia, createPinia } from 'pinia';
import { beforeEach, describe, expect, test } from 'vitest';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';

const mockThemeName = ref('dark');

mockNuxtImport('useTheme', () => () => ({
  global: {
    name: mockThemeName,
  },
}));

describe('useThemeStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    mockThemeName.value = 'dark';
  });

  test('currentTheme', () => {
    const { currentTheme } = storeToRefs(useThemeStore());
    expect(currentTheme.value).toEqual('dark');
  });

  test('isDark (read)', () => {
    const { isDark } = storeToRefs(useThemeStore());
    expect(isDark.value).toBeTruthy();
  });

  test('isDark (write)', () => {
    const { isDark, currentTheme } = storeToRefs(useThemeStore());
    isDark.value = false;
    expect(currentTheme.value).toEqual('light');
    isDark.value = true;
    expect(currentTheme.value).toEqual('dark');
  });
});
