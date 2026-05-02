import { setActivePinia, createPinia } from 'pinia';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { type EffectScope, nextTick } from 'vue';

const mockThemeName = ref('dark');

mockNuxtImport('useTheme', () => () => ({
  global: {
    name: mockThemeName,
  },
}));

describe('useThemeStore', () => {
  let scope: EffectScope;

  beforeEach(() => {
    setActivePinia(createPinia());
    scope = effectScope();
    mockThemeName.value = 'dark';
  });
  afterEach(() => {
    scope.stop();
    vi.resetAllMocks();
  });

  test('currentTheme', () => {
    const { currentTheme } = storeToRefs(useThemeStore());
    expect(currentTheme.value).toEqual('dark');
  });

  test('isDark (read)', () => {
    const { isDark } = storeToRefs(useThemeStore());
    expect(isDark.value).toBeTruthy();
  });

  test('isDark (write)', async () => {
    const themeStore = scope.run(() => useThemeStore());
    const { isDark, currentTheme } = storeToRefs(themeStore!);

    isDark.value = false;
    await nextTick(); // Wait for the watcher to update the theme
    expect(currentTheme.value).toEqual('light');

    isDark.value = true;
    await nextTick(); // Wait for the watcher to update the theme
    expect(currentTheme.value).toEqual('dark');
  });
});
