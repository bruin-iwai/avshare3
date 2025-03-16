import { describe, test, expect } from 'vitest';
import { contentsListRouter } from '~/api/contentsList';
import { rootRouter } from '~/api/root';
import * as api from '~/api';

describe('api', () => {
  test('index', () => {
    expect(api.contentsListRouter).toBe(contentsListRouter);
    expect(api.rootRouter).toBe(rootRouter);
  });
});
