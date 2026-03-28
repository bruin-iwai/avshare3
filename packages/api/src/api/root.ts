import { Type, type FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';

// eslint-disable-next-line @typescript-eslint/require-await
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
    (_req) => ({ message: 'Hello world' }),
  );
};
