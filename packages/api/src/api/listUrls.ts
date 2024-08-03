import { S3, GetObjectCommand } from '@aws-sdk/client-s3';
import { generateSignedUrl } from './generateSignedUrl';
import type { IndexSchema, UrlInfo } from './indexSchema';

export const listUrls = async (bucket: string, prefix: string) => {
  // S3からindex.jsonをダウンロード
  const client = new S3({});
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: `${prefix}/index.json`,
  });
  const ret = await client.send(command);
  const data = (await ret.Body?.transformToString()) as string;
  const index = JSON.parse(data) as IndexSchema;

  // index.jsonのfiles[].{file, title}を取得し、fileをsingedUrlに変換する
  const urls: UrlInfo[] = [];
  for (let i = 0; i < index.files.length; i++) {
    const item = index.files[i];
    const url = await generateSignedUrl(bucket, prefix, item.file);
    urls.push({
      url,
      title: item.title,
    });
  }
  return urls;
};
