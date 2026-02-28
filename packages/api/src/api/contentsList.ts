import type { FastifyPluginAsync } from 'fastify';
import { fetchContentsList } from '~/services/fetchContentsList';
import type { IContentsListQuerystring, UrlInfoType } from '@avshare3/types';

export const contentsListRouter: FastifyPluginAsync = async (fastify, _opts) => {
  fastify.get<{
    Querystring: IContentsListQuerystring;
    Reply: UrlInfoType[];
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
                href: { type: 'string' },
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
      if (!prefix) {
        return [];
      }
      const urlInfoList = await fetchContentsList(prefix);
      return urlInfoList;
    },
  );
};
