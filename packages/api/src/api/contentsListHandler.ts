import type { RequestHandler } from 'express';
import type { QueryParam, UrlInfo } from './indexSchema';
import { listUrls } from './listUrls';

export const contentsListHandler: RequestHandler<void, UrlInfo[], unknown, QueryParam> = (
  req,
  res,
  next,
) => {
  (async () => {
    const { prefix } = req.query;
    const bucket = process.env.BUCKET_NAME!;
    const urls = await listUrls(bucket, prefix);
    res.json(urls);

    // call next() for unit test
    next();
  })().catch(next);
};
