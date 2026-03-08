import { Type, type FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';

export const rootRouter: FastifyPluginAsyncTypebox = async (fastify, _opts) => {
  fastify.get(
    '/',
    {
      schema: {
        summary: 'Hello world',
        tags: ['general'],
        response: {
          '200': Type.Object({
            message: Type.String(),
          }),
        },
      },
    },
    async (_req) => {
      return { message: 'Hello world' };
    },
  );
};
