import type { FastifyPluginCallback } from 'fastify';
import { contentsListHandler } from './contentsListHandler';

export const apiRouter: FastifyPluginCallback = (fastify, _opts, done) => {
  fastify.get('/contentsList', contentsListHandler);
  done();
};
