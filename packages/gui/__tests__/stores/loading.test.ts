import { describe, test, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useLoadingStore } from '~/stores/loading';

describe('useLoadingStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('initial state', () => {
    const loadingStore = useLoadingStore();
    expect(loadingStore.loading).toBeFalsy();
  });

  test('state (mutate)', () => {
    const loadingStore = useLoadingStore();
    loadingStore.loading = true;
    expect(loadingStore.loading).toBeTruthy();
  });
});
