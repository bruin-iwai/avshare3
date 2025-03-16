import type { FastifyPluginAsync } from 'fastify';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { ErrorInfo, QueryParam, UrlInfoList } from '~/types';
import { fetchContentsList } from '~/services/fetchContentsList';

export const contentsListRouter: FastifyPluginAsync = async (fastify, _opts) => {
  fastify.withTypeProvider<TypeBoxTypeProvider>().get(
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
