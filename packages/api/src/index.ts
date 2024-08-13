import { ServerlessAdapter } from '@h4ad/serverless-adapter';
import { FastifyFramework } from '@h4ad/serverless-adapter/frameworks/fastify';
import { LazyFramework } from '@h4ad/serverless-adapter/frameworks/lazy';
import { DefaultHandler } from '@h4ad/serverless-adapter/handlers/default';
import { PromiseResolver } from '@h4ad/serverless-adapter/resolvers/promise';
import { ApiGatewayV2Adapter } from '@h4ad/serverless-adapter/adapters/aws';
import { CorsFramework, CorsFrameworkOptions } from '@h4ad/serverless-adapter/frameworks/cors';
import { createApp } from './app';

const corsOpts: CorsFrameworkOptions = { origin: '*' };

export const handler = ServerlessAdapter.new(null)
  .setFramework(new LazyFramework(new CorsFramework(new FastifyFramework(), corsOpts), createApp))
  .setHandler(new DefaultHandler())
  .setResolver(new PromiseResolver())
  .addAdapter(new ApiGatewayV2Adapter())
  .build();
