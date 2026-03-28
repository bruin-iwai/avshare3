import { listUrls } from './listUrls.js';
import type { ContentInfoType } from '~/types/contentInfoType.js';

export const fetchContentsList = async (prefix: string): Promise<ContentInfoType[]> => {
  const bucket = process.env.BUCKET_NAME!;
  const urls = await listUrls(bucket, prefix);
  return urls;
};
