import { ServerlessAdapter } from '@h4ad/serverless-adapter';
import { ExpressFramework } from '@h4ad/serverless-adapter/frameworks/express';
import { DefaultHandler } from '@h4ad/serverless-adapter/handlers/default';
import { PromiseResolver } from '@h4ad/serverless-adapter/resolvers/promise';
import { ApiGatewayV2Adapter } from '@h4ad/serverless-adapter/adapters/aws';
import { app } from './app';

export const handler = ServerlessAdapter.new(app)
  .setFramework(new ExpressFramework())
  .setHandler(new DefaultHandler())
  .setResolver(new PromiseResolver())
  .addAdapter(new ApiGatewayV2Adapter())
  .build();
