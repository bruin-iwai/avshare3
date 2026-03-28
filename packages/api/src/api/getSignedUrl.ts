import { Type, type FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import createHttpError from 'http-errors';
import { keyToSignedUrl } from '~/services/keyToSignedUrl.js';

const { BadRequest } = createHttpError;

// eslint-disable-next-line @typescript-eslint/require-await
export const getSignedUrlRouter: FastifyPluginAsyncTypebox = async (fastify, _opts) => {
  fastify.get(
    '/getSignedUrl',
    {
      schema: {
        summary: 'Get signed url',
        tags: ['general'],
        querystring: Type.Object({
          prefix: Type.String(),
          key: Type.String(),
        }),
        response: {
          '200': Type.Object(
            {
              url: Type.String(),
            },
            {
              description: 'Successful response',
            },
          ),
          default: Type.Object(
            {
              statusCode: Type.Number(),
              error: Type.String(),
              message: Type.String(),
            },
            {
              description: 'Unsuccessful response',
            },
          ),
        },
      },
    },
    async (req) => {
      const { prefix, key } = req.query;
      if (!prefix || !key) {
        throw new BadRequest('Both prefix and key should be specified');
      }
      const url = await keyToSignedUrl(prefix, key);
      return { url };
    },
  );
};
