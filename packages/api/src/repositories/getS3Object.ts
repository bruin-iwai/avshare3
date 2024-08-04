import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';

export const getS3Object = async (bucket: string, key: string) => {
  const client = new S3Client();
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });
  const ret = await client.send(command);
  const data = (await ret.Body?.transformToString()) as string;
  return data;
};
