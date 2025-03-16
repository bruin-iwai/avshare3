import { describe, test, expect } from 'vitest';
import { generateSignedUrl } from '~/repositories/generateSignedUrl';
import { getS3Object } from '~/repositories/getS3Object';
import * as repositories from '~/repositories';

describe('repositories', () => {
  test('index', () => {
    expect(repositories.generateSignedUrl).toBe(generateSignedUrl);
    expect(repositories.getS3Object).toBe(getS3Object);
  });
});
