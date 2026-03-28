import { generateSignedUrl } from '~/repositories/index.js';

export const keyToSignedUrl = async (prefix: string, key: string) => {
  const bucket = process.env.BUCKET_NAME!;
  const url = await generateSignedUrl(bucket, `${prefix}/${key}`);
  return url;
};
