import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { contentsListHandler } from './contentsListHandler';

export async function apiRouter(fastify: FastifyInstance, _opts: FastifyPluginOptions) {
  fastify.get(
    '/contentsList',
    {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            prefix: { type: 'string' },
          },
        },
      },
    },
    contentsListHandler,
  );
}
