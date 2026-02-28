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
    const { prefix, urls } = storeToRefs(contentsStore!);
    mockFetch.mockResolvedValueOnce([
      { title: 'ppp', href: 'http://example.com' },
      { title: 'qqq', href: 'http://whoami.com' },
    ]);

    expect(urls.value).toEqual([]);

    prefix.value = 'someValue';
    await nextTick();

    expect(urls.value).toEqual([
      { title: 'ppp', href: 'http://example.com' },
      { title: 'qqq', href: 'http://whoami.com' },
    ]);
    expect(mockFetch).toHaveBeenCalledOnce();
    expect(mockFetch).toHaveBeenCalledWith('/contentsList', {
      method: 'GET',
      query: { prefix: 'someValue' },
    });
  });
});
