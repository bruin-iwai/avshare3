import { expect } from 'vitest';
import { allCustomMatcher } from 'aws-sdk-client-mock-vitest';

expect.extend(allCustomMatcher);
