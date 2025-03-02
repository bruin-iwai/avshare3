import type { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import type { JSONSchema } from 'json-schema-to-ts/lib/types/definitions';
import { fetchContentsList } from '~/services/fetchContentsList';

const schemaQueryParam = {
  $id: 'schema:QueryParam',
  type: 'object',
  properties: {
    prefix: { type: 'string' },
  },
  additionalProperties: false,
  required: ['prefix'],
} as const satisfies JSONSchema;

const schemaUrlInfoList = {
  $id: 'schema:UrlInfoList',
  description: 'Successful response',
  type: 'array',
  items: {
    type: 'object',
    properties: {
      url: { type: 'string' },
      title: { type: 'string' },
    },
    additionalProperties: false,
    required: ['url', 'title'],
  },
} as const satisfies JSONSchema;

const schemaErrorInfo = {
  $id: 'schema:ErrorInfo',
  description: 'Error response',
  type: 'object',
  properties: {
    statusCode: { type: 'number' },
    error: { type: 'string' },
    message: { type: 'string' },
  },
  additionalProperties: false,
} as const satisfies JSONSchema;

export const apiRouter: FastifyPluginAsyncJsonSchemaToTs<{
  ValidatorSchemaOptions: {
    references: [typeof schemaQueryParam];
  };
  SerializerSchemaOptions: {
    references: [typeof schemaUrlInfoList, typeof schemaErrorInfo];
  };
}> = async (fastify, _opts) => {
  fastify.addSchema(schemaQueryParam).addSchema(schemaUrlInfoList).addSchema(schemaErrorInfo);

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

  fastify.get(
    '/contentsList',
    {
      schema: {
        summary: 'Get contents list',
        tags: ['general'],
        querystring: {
          $ref: 'schema:QueryParam',
        },
        response: {
          '200': {
            $ref: 'schema:UrlInfoList',
          },
          default: {
            $ref: 'schema:ErrorInfo',
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
