import type { FastifyPluginAsync } from 'fastify';
import { fetchContentsList } from '~/services/fetchContentsList';
import {
  ErrorInfo,
  type ErrorInfoType,
  QueryParam,
  type QueryParamType,
  UrlInfoList,
  type UrlInfoListType,
} from '~/types';

export const apiRouter: FastifyPluginAsync = async (fastify, _opts) => {
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

  fastify.get<{
    Querystring: QueryParamType;
    Reply: UrlInfoListType | ErrorInfoType;
  }>(
    '/contentsList',
    {
      schema: {
        summary: 'Get contents list',
        tags: ['general'],
        querystring: QueryParam,
        response: {
          '200': UrlInfoList,
          default: ErrorInfo,
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
