import type { Request, Response } from 'express';
import { contentsListHandler } from '~/api/contentsListHandler';
import type { QueryParam, UrlInfo } from '~/api/indexSchema';
import { listUrls } from '~/api/listUrls';

jest.mock('~/api/listUrls');
const mockedListUrls = jest.mocked(listUrls);

describe('handler', () => {
  beforeEach(() => {
    jest.replaceProperty(process, 'env', { BUCKET_NAME: 'aa' });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('contentsListHandler', async () => {
    const reqMock = {
      query: {
        prefix: 'bb',
      },
    } as unknown as Request<void, UrlInfo[], unknown, QueryParam>;
    const resMock = {
      json: jest.fn(),
    } as unknown as Response<UrlInfo[]>;

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

    contentsListHandler(reqMock, resMock, () => {
      expect(resMock.json).toHaveBeenCalledTimes(1);
      expect(resMock.json).toHaveBeenCalledWith([
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
});
