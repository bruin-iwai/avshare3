import { describe, test, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useThemeStore } from '~/stores/theme';

describe('useThemeStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('initial state', () => {
    const themeStore = useThemeStore();
    expect(themeStore.isDark).toBeTruthy();
    expect(themeStore.themeLabel).toEqual('dark mode');
  });

  test('state (mutate)', () => {
    const themeStore = useThemeStore();
    themeStore.isDark = false;
    expect(themeStore.isDark).toBeFalsy();
    expect(themeStore.themeLabel).toEqual('light mode');
  });
});
