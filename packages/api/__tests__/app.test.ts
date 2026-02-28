import { vi, describe, test, expect } from 'vitest';
import { fetchContentsList } from '~/services/fetchContentsList';
import { createApp } from '~/app';

vi.mock('~/services/fetchContentsList');
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
    const urlInfoList = [
      { href: 'a', title: 'あ' },
      { href: 'b', title: 'い' },
      { href: 'c', title: 'う' },
    ];
    mockFetchContentsList.mockResolvedValueOnce(urlInfoList);

    const app = await createApp();

    const { statusCode, headers, body } = await app.inject({
      method: 'GET',
      url: '/api/contentsList',
      query: { prefix: 'yours' },
    });

    expect(statusCode).toBe(200);
    expect(headers['content-type']).toEqual('application/json; charset=utf-8');
    expect(body).toEqual(JSON.stringify(urlInfoList));

    expect(mockFetchContentsList).toBeCalledTimes(1);
    expect(mockFetchContentsList).toBeCalledWith('yours');
  });
});
