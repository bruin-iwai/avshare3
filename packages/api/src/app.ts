import Fastify from 'fastify';
import fastifyHelmet from '@fastify/helmet';
import fastifyCompress from '@fastify/compress';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifyCors from '@fastify/cors';
import { rootRouter, contentsListRouter } from '~/api';

export const createApp = async () => {
  const fastify = Fastify({
    logger: true,
  });

  fastify.register(fastifyHelmet);
  await fastify.register(fastifyCompress);
  await fastify.register(fastifyCors, {
    origin: process.env.CORS_ENABLED === 'true',
  });

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
    logo: { type: '', content: '' },
  });

  fastify.register(rootRouter, { prefix: '/api' });
  fastify.register(contentsListRouter, { prefix: '/api' });

  return fastify;
};
