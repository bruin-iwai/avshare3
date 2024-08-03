import { contentsListHandler } from '~/api/contentsListHandler';
import { listUrls } from '~/api/listUrls';
import type { FastifyReply, FastifyRequest } from 'fastify';

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
    } as unknown as FastifyRequest;

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

    const ret = await contentsListHandler(reqMock, {} as unknown as FastifyReply);

    expect(ret).toEqual({
      urls: [
        {
          url: 'https://dummy1',
          title: 'ああ',
        },
        {
          url: 'https://dummy2',
          title: 'いい',
        },
      ],
    });

    expect(listUrls).toHaveBeenCalledTimes(1);
    expect(listUrls).toHaveBeenCalledWith(process.env.BUCKET_NAME, 'bb');
  });
});
