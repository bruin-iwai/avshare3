import { describe, test, expect } from 'vitest';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { sdkStreamMixin } from '@smithy/util-stream';
import { mockClient } from 'aws-sdk-client-mock';
import { getS3Object } from '~/repositories';
import { Readable } from 'node:stream';

const mockS3Client = mockClient(S3Client);

describe('getS3Object', () => {
  test('normal', async () => {
    const stream = new Readable();
    stream.push('MyTestData');
    stream.push(null); // end of stream

    const sdkStream = sdkStreamMixin(stream);

    mockS3Client
      .on(GetObjectCommand, {
        Bucket: 'bucket1',
        Key: 'key1',
      })
      .resolvesOnce({
        Body: sdkStream,
      });

    const res = await getS3Object('bucket1', 'key1');

    expect(res).toEqual('MyTestData');
  });
});
