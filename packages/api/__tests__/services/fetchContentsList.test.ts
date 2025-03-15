import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { fetchContentsList } from '~/services/fetchContentsList';
import { listUrls } from '~/services/listUrls';

vi.mock('~/services/listUrls');
const mockedListUrls = vi.mocked(listUrls);

describe('fetchContentsList', () => {
  beforeEach(() => {
    vi.stubEnv('BUCKET_NAME', 'aa');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  test('fetchContentsList', async () => {
    mockedListUrls.mockResolvedValueOnce([
      {
        url: 'https://dummy1',
        title: 'ああ',
      },
      {
        url: 'https://dummy2',
        title: 'いい',
      },
    ]);

    const ret = await fetchContentsList('bb');

    expect(ret).toEqual([
      {
        url: 'https://dummy1',
        title: 'ああ',
      },
      {
        url: 'https://dummy2',
        title: 'いい',
      },
    ]);

    expect(listUrls).toHaveBeenCalledTimes(1);
    expect(listUrls).toHaveBeenCalledWith(process.env.BUCKET_NAME, 'bb');
  });
});
