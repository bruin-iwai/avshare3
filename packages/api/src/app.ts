import Fastify from 'fastify';
import fastifyHelmet from '@fastify/helmet';
import fastifyCors from '@fastify/cors';
import fastifyCompress from '@fastify/compress';
import fastifyBasicAuth from '@fastify/basic-auth';
import { apiRouter } from '~/api';
import { getSectets } from '~/repositories/getSecrets';
import type { SecretCredentials } from './api/indexSchema';

export const createApp = async () => {
  const fastify = Fastify({
    logger: true,
  });

  fastify.register(fastifyHelmet);
  await fastify.register(fastifyCors);
  await fastify.register(fastifyCompress);

  // basic auth
  fastify.register(fastifyBasicAuth, {
    authenticate: {
      realm: 'avshare3',
    },
    async validate(usernameInput, passwordInput, _req, _reply) {
      const { username, password } = JSON.parse(
        (await getSectets(process.env.SECRET_ID!)) as string,
      ) as SecretCredentials;
      if (usernameInput !== username || passwordInput !== password) {
        return new Error('Forbidden');
      }
    },
  });

  fastify.after(() => {
    fastify.addHook('onRequest', fastify.basicAuth);

    fastify.get('/', async (_req, _reply) => {
      return { message: 'Hello world' };
    });

    fastify.register(apiRouter, { prefix: '/api' });
  });

  return fastify;
};
