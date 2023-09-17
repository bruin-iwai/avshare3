import { RequestHandler } from 'express';
import { UrlInfo, QueryParam } from '~/api/indexSchema';
import { listUrls } from '~/api/listUrls';

export const contentsListHandler: RequestHandler<unknown, UrlInfo[], unknown, QueryParam> = (
  req,
  res,
  next,
) => {
  (async () => {
    const { prefix } = req.query;
    const bucket = process.env.BUCKET_NAME as string;
    const urls = await listUrls(bucket, prefix);
    res.json(urls);
    next();
  })().catch(next);
};
