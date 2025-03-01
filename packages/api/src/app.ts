import Fastify from 'fastify';
import fastifyHelmet from '@fastify/helmet';
import fastifyCompress from '@fastify/compress';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { apiRouter } from '~/api';

export const createApp = async () => {
  const fastify = Fastify({
    logger: true,
  });

  fastify.register(fastifyHelmet);
  await fastify.register(fastifyCompress);

  await fastify.register(fastifySwagger, {
    openapi: {
      openapi: '3.1.0',
      info: {
        title: 'avshare3',
        description: 'Testing the avshare3 api',
        version: '0.1.0',
      },
      tags: [{ name: 'general', description: 'API for general use' }],
    },
  });
  await fastify.register(fastifySwaggerUi, {
    routePrefix: '/api/docs',
  });

  fastify.after(() => {
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

    fastify.register(apiRouter, { prefix: '/api' });
  });

  return fastify;
};
