import { vi, describe, test, expect } from 'vitest';
import Fastify from 'fastify';
import { contentsListRouter } from '~/api';
import { fetchContentsList } from '~/services/fetchContentsList';

vi.mock('~/services/fetchContentsList');
const mockFetchContentsList = vi.mocked(fetchContentsList);

describe('contentsList', () => {
  test('contentsList', async () => {
    const urlInfoList = [
      { url: 'a', title: 'あ' },
      { url: 'b', title: 'い' },
      { url: 'c', title: 'う' },
    ];
    mockFetchContentsList.mockResolvedValueOnce(urlInfoList);

    const fastify = Fastify();
    fastify.register(contentsListRouter);

    const { statusCode, headers, body } = await fastify.inject({
      method: 'GET',
      url: '/contentsList',
      query: { prefix: 'mine' },
    });

    expect(statusCode).toBe(200);
    expect(headers['content-type']).toEqual('application/json; charset=utf-8');
    expect(body).toEqual(JSON.stringify(urlInfoList));

    expect(mockFetchContentsList).toBeCalledTimes(1);
    expect(mockFetchContentsList).toBeCalledWith('mine');
  });
});
