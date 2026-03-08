import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { setActivePinia, createPinia } from 'pinia';
import { afterEach, beforeEach, describe, expect, test, vitest } from 'vitest';
import { type EffectScope, nextTick } from 'vue';

const { mockFetch } = vitest.hoisted(() => ({
  mockFetch: vitest.fn(),
}));

mockNuxtImport('useApi', () => () => mockFetch);

describe('useContentsStore', () => {
  let scope: EffectScope;

  beforeEach(() => {
    setActivePinia(createPinia());
    scope = effectScope();
  });
  afterEach(() => {
    scope.stop();
    vitest.resetAllMocks();
  });

  test('prefix', () => {
    const { prefix } = storeToRefs(useContentsStore());
    expect(prefix.value).toEqual('');
    prefix.value = 'aaa';
    expect(prefix.value).toEqual('aaa');
  });

  test('$reset', () => {
    const contentsStore = useContentsStore();
    const { prefix } = storeToRefs(contentsStore);
    const { $reset } = contentsStore;
    prefix.value = 'aaa';
    $reset();
    expect(prefix.value).toEqual('');
  });

  test('fetch', async () => {
    const contentsStore = scope.run(() => useContentsStore());
    const { prefix, contents } = storeToRefs(contentsStore!);
    mockFetch.mockResolvedValueOnce([
      { title: 'ppp', key: 'aaa.mp4' },
      { title: 'qqq', key: 'bbb.mp4' },
    ]);

    expect(contents.value).toEqual([]);

    prefix.value = 'someValue';
    await nextTick();

    expect(contents.value).toEqual([
      { title: 'ppp', key: 'aaa.mp4' },
      { title: 'qqq', key: 'bbb.mp4' },
    ]);
    expect(mockFetch).toHaveBeenCalledOnce();
    expect(mockFetch).toHaveBeenCalledWith('/contentsList', {
      method: 'GET',
      query: { prefix: 'someValue' },
    });
  });
});
