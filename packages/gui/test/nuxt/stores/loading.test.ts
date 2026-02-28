import { setActivePinia, createPinia } from 'pinia';
import { beforeEach, describe, expect, test } from 'vitest';

describe('useLoadingStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('loading', () => {
    const { loading } = storeToRefs(useLoadingStore());
    expect(loading.value).toBeFalsy();
    loading.value = true;
    expect(loading.value).toBeTruthy();
    loading.value = false;
    expect(loading.value).toBeFalsy();
  });

  test('$reset', () => {
    const loadingStore = useLoadingStore();
    const { loading } = storeToRefs(loadingStore);
    const { $reset } = loadingStore;
    loading.value = true;
    $reset();
    expect(loading.value).toBeFalsy();
  });
});
