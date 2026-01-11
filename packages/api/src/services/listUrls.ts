import { generateSignedUrl, getS3Object } from '~/repositories';
import type { IndexSchema, UrlInfoType } from '@avshare3/types';

export const listUrls = async (bucket: string, prefix: string) => {
  // S3からindex.jsonをダウンロード
  const data = await getS3Object(bucket, `${prefix}/index.json`);
  const index = JSON.parse(data) as IndexSchema;

  // index.jsonのfiles[].{file, title}を取得し、fileをsingedUrlに変換する
  const urls: UrlInfoType[] = [];
  for (let i = 0; i < index.files.length; i++) {
    const item = index.files[i];
    const url = await generateSignedUrl(bucket, `${prefix}/${item.file}`);
    urls.push({
      url,
      title: item.title,
    });
  }
  return urls;
};
