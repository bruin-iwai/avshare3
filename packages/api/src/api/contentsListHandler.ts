import type { QueryParam } from './indexSchema';
import { listUrls } from './listUrls';
import type { FastifyReply, FastifyRequest } from 'fastify';

export async function contentsListHandler(request: FastifyRequest, _reply: FastifyReply) {
  const { prefix } = request.query as QueryParam;
  const bucket = process.env.BUCKET_NAME!;
  const urls = await listUrls(bucket, prefix);
  return urls;
}
