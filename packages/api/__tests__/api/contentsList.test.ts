import { vi, describe, test, expect } from 'vitest';
import Fastify from 'fastify';
import { contentsListRouter } from '~/api/index.js';
import { fetchContentsList } from '~/services/fetchContentsList.js';

vi.mock('~/services/fetchContentsList.js');
const mockFetchContentsList = vi.mocked(fetchContentsList);

describe('contentsList', () => {
  test('contentsList', async () => {
    const contentsInfoList = [
      { key: 'a', title: 'あ' },
      { key: 'b', title: 'い' },
      { key: 'c', title: 'う' },
    ];
    mockFetchContentsList.mockResolvedValueOnce(contentsInfoList);

    const fastify = Fastify();
    fastify.register(contentsListRouter);

    const { statusCode, headers, body } = await fastify.inject({
      method: 'GET',
      url: '/contentsList',
      query: { prefix: 'mine' },
    });

    expect(statusCode).toBe(200);
    expect(headers['content-type']).toEqual('application/json; charset=utf-8');
    expect(body).toEqual(JSON.stringify(contentsInfoList));

    expect(mockFetchContentsList).toBeCalledTimes(1);
    expect(mockFetchContentsList).toBeCalledWith('mine');
  });
});
