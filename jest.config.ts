import type { JestConfigWithTsJest } from 'ts-jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './packages/api/tsconfig.json';

const jestConfig: JestConfigWithTsJest = {
  clearMocks: true,
  collectCoverage: true,
  projects: [
    {
      displayName: 'api',
      preset: 'ts-jest/presets/default-esm',
      testEnvironment: 'node',
      rootDir: 'packages/api',
      modulePaths: [compilerOptions.baseUrl],
      moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
      collectCoverageFrom: ['src/**/*.ts'],
    },
  ],
};

export default jestConfig;
