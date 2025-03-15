import { vi, describe, test, expect, MockedClass } from 'vitest';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { generateSignedUrl } from '~/repositories/generateSignedUrl';

vi.mock('@aws-sdk/s3-request-presigner');
const mockedGetSignedUrl = vi.mocked(getSignedUrl);

vi.mock('@aws-sdk/client-s3');
const mockedS3Client = S3Client as MockedClass<typeof S3Client>;
const mockedGetObjectCommand = GetObjectCommand as MockedClass<typeof GetObjectCommand>;

describe('generateSignedUrl', () => {
  test('main', async () => {
    mockedGetSignedUrl.mockResolvedValueOnce('https://dummy');

    const ret = await generateSignedUrl('aa', 'bb/cc');

    expect(ret).toEqual('https://dummy');

    expect(getSignedUrl).toHaveBeenCalledTimes(1);
    expect(getSignedUrl).toHaveBeenCalledWith(expect.any(S3Client), expect.any(GetObjectCommand));

    expect(mockedS3Client.mock.calls[0].length).toEqual(0);
    expect(mockedGetObjectCommand.mock.calls[0][0]).toEqual({
      Bucket: 'aa',
      Key: 'bb/cc',
    });
  });
});
