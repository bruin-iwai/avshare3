import { describe, test, expect } from 'vitest';
import { contentsListRouter } from '~/api/contentsList.js';
import { rootRouter } from '~/api/root.js';
import * as api from '~/api/index.js';

describe('api', () => {
  test('index', () => {
    expect(api.contentsListRouter).toBe(contentsListRouter);
    expect(api.rootRouter).toBe(rootRouter);
  });
});
