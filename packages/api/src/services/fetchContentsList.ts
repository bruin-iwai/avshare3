import { listUrls } from './listUrls';
import type { ContentInfoType } from '~/types/contentInfoType';

export const fetchContentsList = async (prefix: string): Promise<ContentInfoType[]> => {
  const bucket = process.env.BUCKET_NAME!;
  const urls = await listUrls(bucket, prefix);
  return urls;
};
