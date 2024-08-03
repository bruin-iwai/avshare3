import type { FastifyReply, FastifyRequest } from 'fastify';
import type { QueryParam } from './indexSchema';
import { listUrls } from './listUrls';

export const contentsListHandler = async (request: FastifyRequest, _reply: FastifyReply) => {
  const { prefix } = request.query as QueryParam;
  const bucket = process.env.BUCKET_NAME!;
  const urls = await listUrls(bucket, prefix);
  return { urls };
};
