import { describe, test, expect } from 'vitest';
import { generateSignedUrl } from '~/repositories/generateSignedUrl.js';
import { getS3Object } from '~/repositories/getS3Object.js';
import * as repositories from '~/repositories/index.js';

describe('repositories', () => {
  test('index', () => {
    expect(repositories.generateSignedUrl).toBe(generateSignedUrl);
    expect(repositories.getS3Object).toBe(getS3Object);
  });
});
