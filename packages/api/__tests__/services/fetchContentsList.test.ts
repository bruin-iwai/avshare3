import { fetchContentsList } from '~/services/fetchContentsList';
import { listUrls } from '~/services/listUrls';

jest.mock('~/services/listUrls');
const mockedListUrls = jest.mocked(listUrls);

describe('fetchContentsList', () => {
  beforeEach(() => {
    jest.replaceProperty(process, 'env', { BUCKET_NAME: 'aa' });
  });

  afterEach(() => {
    jest.restoreAllMocks();
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
