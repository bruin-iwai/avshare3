import Fastify from 'fastify';
import fastifyHelmet from '@fastify/helmet';
import fastifyCors from '@fastify/cors';
import fastifyCompress from '@fastify/compress';
import { apiRouter } from '~/api';

export const createApp = async () => {
  const fastify = Fastify({
    logger: true,
  });

  fastify.register(fastifyHelmet);
  await fastify.register(fastifyCors);
  await fastify.register(fastifyCompress);

  fastify.after(() => {
    fastify.get('/', async (_req, _reply) => {
      return { message: 'Hello world' };
    });

    fastify.register(apiRouter, { prefix: '/api' });
  });

  return fastify;
};
