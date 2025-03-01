import type { FastifyPluginAsync } from 'fastify';
import { contentsListHandler } from './contentsListHandler';

export const apiRouter: FastifyPluginAsync = async (fastify, _opts) => {
  fastify.get(
    '/contentsList',
    {
      schema: {
        summary: 'Get contents list',
        tags: ['general'],
        querystring: {
          type: 'object',
          properties: {
            prefix: { type: 'string' },
          },
          required: ['prefix'],
        },
        response: {
          '200': {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                url: { type: 'string' },
                title: { type: 'string' },
              },
            },
          },
        },
      },
    },
    contentsListHandler,
  );
};
