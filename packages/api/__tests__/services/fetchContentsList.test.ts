import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { fetchContentsList } from '~/services/fetchContentsList.js';
import { listUrls } from '~/services/listUrls.js';

vi.mock('~/services/listUrls.js');
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
        key: 'aa.mp4',
        title: 'ああ',
      },
      {
        key: 'bb.mp4',
        title: 'いい',
      },
    ]);

    const ret = await fetchContentsList('bb');

    expect(ret).toEqual([
      {
        key: 'aa.mp4',
        title: 'ああ',
      },
      {
        key: 'bb.mp4',
        title: 'いい',
      },
    ]);

    expect(listUrls).toHaveBeenCalledTimes(1);
    expect(listUrls).toHaveBeenCalledWith(process.env.BUCKET_NAME, 'bb');
  });
});
