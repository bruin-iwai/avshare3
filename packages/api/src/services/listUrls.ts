import { getS3Object } from '~/repositories/index.js';
import type { ContentInfoType } from '~/types/contentInfoType.js';

type IndexSchema = {
  title: string;
  files: {
    file: string;
    title: string;
  }[];
};

export const listUrls = async (bucket: string, prefix: string): Promise<ContentInfoType[]> => {
  const data = await getS3Object(bucket, `${prefix}/index.json`);
  const index = JSON.parse(data) as IndexSchema;
  return index.files.map((item) => ({ key: item.file, title: item.title }));
};
