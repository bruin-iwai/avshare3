import path from 'node:path';
import Fastify from 'fastify';
import fastifyHelmet from '@fastify/helmet';
import fastifyCompress from '@fastify/compress';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifyCors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import { rootRouter, contentsListRouter } from '~/api';

export const createApp = async () => {
  const fastify = Fastify({
    logger: true,
  });

  // CloudFront から付与する秘密の値（環境変数で管理）
  const APP_RESTRICTION_KEY = process.env.APP_RESTRICTION_KEY;

  // すべてのリクエストで CloudFront ヘッダーを検証
  fastify.addHook('onRequest', async (request, reply) => {
    const headerValue = request.headers['x-app-restriction-key'];

    if (headerValue !== APP_RESTRICTION_KEY) {
      reply.code(403).send({ error: 'Forbidden' });
      return reply;
    }
  });

  fastify.register(fastifyHelmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:'],
      },
    },
  });
  await fastify.register(fastifyCompress, { encodings: ['br', 'gzip', 'deflate'] });
  await fastify.register(fastifyCors, {
    origin: process.env.CORS_ENABLED === 'true',
  });

  fastify.register(fastifyStatic, {
    root: path.resolve(process.cwd(), '../gui/.output/public'),
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
