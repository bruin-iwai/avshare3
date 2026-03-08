import { Type, type FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { fetchContentsList } from '~/services/fetchContentsList';
import { ContentInfoSchema } from '~/types/contentInfoType';

export const contentsListRouter: FastifyPluginAsyncTypebox = async (fastify, _opts) => {
  fastify.get(
    '/contentsList',
    {
      schema: {
        summary: 'Get contents list',
        tags: ['general'],
        querystring: Type.Object({
          prefix: Type.String(),
        }),
        response: {
          '200': Type.Array(ContentInfoSchema, {
            description: 'Successful response',
          }),
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
      const { prefix } = req.query;
      if (!prefix) {
        return [];
      }
      const urlInfoList = await fetchContentsList(prefix);
      return urlInfoList;
    },
  );
};
