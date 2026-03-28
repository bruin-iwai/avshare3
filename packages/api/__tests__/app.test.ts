import { vi, describe, test, expect } from 'vitest';
import { fetchContentsList } from '~/services/fetchContentsList.js';
import { createApp } from '~/app.js';

vi.mock('~/services/fetchContentsList.js');
const mockFetchContentsList = vi.mocked(fetchContentsList);

describe('app', () => {
  test('root', async () => {
    const app = await createApp();

    const { statusCode, headers, body } = await app.inject({
      method: 'GET',
      url: '/api/',
    });

    expect(statusCode).toBe(200);
    expect(headers['content-type']).toEqual('application/json; charset=utf-8');
    expect(body).toEqual('{"message":"Hello world"}');
  });

  test('contentsList', async () => {
    const contentsInfoList = [
      { key: 'a', title: 'あ' },
      { key: 'b', title: 'い' },
      { key: 'c', title: 'う' },
    ];
    mockFetchContentsList.mockResolvedValueOnce(contentsInfoList);

    const app = await createApp();

    const { statusCode, headers, body } = await app.inject({
      method: 'GET',
      url: '/api/contentsList',
      query: { prefix: 'yours' },
    });

    expect(statusCode).toBe(200);
    expect(headers['content-type']).toEqual('application/json; charset=utf-8');
    expect(body).toEqual(JSON.stringify(contentsInfoList));

    expect(mockFetchContentsList).toBeCalledTimes(1);
    expect(mockFetchContentsList).toBeCalledWith('yours');
  });
});
