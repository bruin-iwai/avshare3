import type { Request, Response } from 'express';
import { contentsListHandler } from '~/api/contentsListHandler';
import { listUrls } from '~/api/listUrls';
import { UrlInfo, QueryParam } from '~/api/indexSchema';

jest.mock('~/api/listUrls');
const mockedListUrls = listUrls as jest.MockedFunction<typeof listUrls>;

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
    } as unknown as Request<unknown, UrlInfo[], unknown, QueryParam>;
    const resMock = {
      json: jest.fn().mockReturnThis(),
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

    await new Promise<void>((resolve, reject) => {
      contentsListHandler(reqMock, resMock, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

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
