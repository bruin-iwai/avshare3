import express, { RequestHandler } from 'express';
import { UrlInfo, QueryParam } from '~/api/indexSchema';
import { listUrls } from '~/api/listUrls';

const contentsListHandler: RequestHandler<unknown, UrlInfo[], unknown, QueryParam> = (
  req,
  res,
  next,
) => {
  (async () => {
    const { prefix } = req.query;
    const bucket = process.env.BUCKET_NAME as string;
    const urls = await listUrls(bucket, prefix);
    res.json(urls);
  })().catch(next);
};

export const apiRouter = express.Router();

apiRouter.get('/contentsList', contentsListHandler);
