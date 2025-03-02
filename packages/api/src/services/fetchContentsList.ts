import type { UrlInfoListType } from '~/types';
import { listUrls } from './listUrls';

export const fetchContentsList = async (prefix: string): Promise<UrlInfoListType> => {
  const bucket = process.env.BUCKET_NAME!;
  const urls = await listUrls(bucket, prefix);
  return urls;
};
