import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  projects: [
    {
      displayName: 'api',
      preset: 'ts-jest',
      testEnvironment: 'node',
      rootDir: '<rootDir>/packages/api',
      moduleNameMapper: {
        '~/(.*)$': '<rootDir>/src/$1',
      },
    },
  ],
};

export default jestConfig;
