import { vi, describe, test, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useRootStore } from '~/stores';
import { ofetch } from 'ofetch';
import type { UrlInfoListType } from '@avshare3/api/src/types';

vi.mock('ofetch');
const mockOfetch = vi.mocked(ofetch);

describe('useRootStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('initial state', () => {
    const rootStore = useRootStore();
    expect(rootStore.prefix).toEqual('');
    expect(rootStore.urls).toEqual([]);
  });

  test('fetchUrls', async () => {
    const expected: UrlInfoListType = [
      {
        url: 'http://a.com/b',
        title: 'aaa',
      },
      {
        url: 'http://a.com/c',
        title: 'ddd',
      },
    ];
    mockOfetch.mockResolvedValueOnce(expected);

    const rootStore = useRootStore();
    const res = await rootStore.fetchUrls('prefix1');

    expect(res).toEqual(expected);

    expect(mockOfetch).toHaveBeenCalledOnce();
    expect(mockOfetch).toHaveBeenCalledWith('/contentsList', {
      baseURL: 'http://localhost/api',
      query: { prefix: 'prefix1' },
    });
  });

  test('watch', async () => {
    const expected: UrlInfoListType = [
      {
        url: 'http://a.com/e',
        title: 'fff',
      },
      {
        url: 'http://a.com/g',
        title: 'hhh',
      },
    ];
    mockOfetch.mockResolvedValueOnce(expected);

    const rootStore = useRootStore();
    rootStore.prefix = 'prefix2';

    await new Promise<void>((resolve, _reject) => {
      setTimeout(() => {
        expect(rootStore.urls).toEqual(expected);

        expect(mockOfetch).toHaveBeenCalledOnce();
        expect(mockOfetch).toHaveBeenCalledWith('/contentsList', {
          baseURL: 'http://localhost/api',
          query: { prefix: 'prefix2' },
        });

        resolve();
      }, 1000);
    });
  });
});
