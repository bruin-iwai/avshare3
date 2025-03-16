import { describe, test, expect } from 'vitest';
import Fastify from 'fastify';
import { rootRouter } from '~/api';

describe('root', () => {
  test('root', async () => {
    const fastify = Fastify();
    fastify.register(rootRouter);

    const { statusCode, headers, body } = await fastify.inject({
      method: 'GET',
      url: '/',
    });

    expect(statusCode).toBe(200);
    expect(headers['content-type']).toEqual('application/json; charset=utf-8');
    expect(body).toEqual('{"message":"Hello world"}');
  });
});
