import type { FastifyPluginAsync } from 'fastify';

export const rootRouter: FastifyPluginAsync = async (fastify, _opts) => {
  fastify.get(
    '/',
    {
      schema: {
        summary: 'Hello world',
        tags: ['general'],
        response: {
          '200': {
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    async (_req, _reply) => {
      return { message: 'Hello world' };
    },
  );
};
