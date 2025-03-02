import type { UrlInfo } from '~/types';
import { listUrls } from './listUrls';

export const fetchContentsList = async (prefix: string): Promise<UrlInfo[]> => {
  const bucket = process.env.BUCKET_NAME!;
  const urls = await listUrls(bucket, prefix);
  return urls;
};
