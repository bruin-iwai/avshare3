import { Readable } from 'node:stream';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { sdkStreamMixin } from '@smithy/util-stream';
import { mockClient } from 'aws-sdk-client-mock';
import { listUrls } from '~/services/listUrls.js';
import { describe, expect, test } from 'vitest';

const s3Mock = mockClient(S3Client);

describe('listUrls', () => {
  test('main', async () => {
    const stream = new Readable();
    stream.push(
      JSON.stringify({
        files: [
          {
            file: 'aa.mp4',
            title: 'ああ',
          },
          {
            file: 'bb.mp4',
            title: 'いい',
          },
        ],
      }),
      'utf8',
    );
    stream.push(null); // end of stream

    // wrap the Stream with SDK mixin
    const sdkStream = sdkStreamMixin(stream);

    s3Mock
      .on(GetObjectCommand, {
        Bucket: 'bucket1',
        Key: 'prefix1/index.json',
      })
      .resolvesOnce({
        Body: sdkStream,
      });

    const urls = await listUrls('bucket1', 'prefix1');

    expect(urls).toEqual([
      {
        key: 'aa.mp4',
        title: 'ああ',
      },
      {
        key: 'bb.mp4',
        title: 'いい',
      },
    ]);
  });
});
