import type { FastifyPluginAsync } from 'fastify';
import { fetchContentsList } from '~/services/fetchContentsList';
import type { UrlInfoListType, IContentsListQuerystring } from '@avshare3/types';

export const contentsListRouter: FastifyPluginAsync = async (fastify, _opts) => {
  fastify.get<{
    Querystring: IContentsListQuerystring;
    Reply: UrlInfoListType;
  }>(
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
        },
        response: {
          '200': {
            description: 'Successful response',
            type: 'array',
            items: {
              type: 'object',
              properties: {
                url: { type: 'string' },
                title: { type: 'string' },
              },
            },
          },
          default: {
            description: 'Unsuccessful response',
            type: 'object',
            properties: {
              statusCode: { type: 'number' },
              error: { type: 'string' },
              message: { type: 'string' },
            },
          },
        },
      },
    },
    async (req, _reply) => {
      const { prefix } = req.query;
      const urlInfoList = await fetchContentsList(prefix);
      return urlInfoList;
    },
  );
};
