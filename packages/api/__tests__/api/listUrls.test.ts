import { Readable } from 'node:stream';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { sdkStreamMixin } from '@smithy/util-stream';
import { mockClient } from 'aws-sdk-client-mock';
import { listUrls } from '~/api/listUrls';
import { generateSignedUrl } from '~/api/generateSignedUrl';

jest.mock('~/api/generateSignedUrl');
const mockedGenerateSignedUrl = jest.mocked(generateSignedUrl);

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

    mockedGenerateSignedUrl
      .mockResolvedValueOnce('https://dummy1')
      .mockResolvedValueOnce('https://dummy2');

    const urls = await listUrls('bucket1', 'prefix1');

    expect(urls).toEqual([
      {
        url: 'https://dummy1',
        title: 'ああ',
      },
      {
        url: 'https://dummy2',
        title: 'いい',
      },
    ]);

    expect(generateSignedUrl).toHaveBeenCalledTimes(2);
    expect(generateSignedUrl).toHaveBeenNthCalledWith(1, 'bucket1', 'prefix1', 'aa.mp4');
    expect(generateSignedUrl).toHaveBeenNthCalledWith(2, 'bucket1', 'prefix1', 'bb.mp4');
  });
});
