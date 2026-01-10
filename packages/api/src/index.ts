import { ServerlessAdapter } from '@h4ad/serverless-adapter';
import { FastifyFramework } from '@h4ad/serverless-adapter/frameworks/fastify';
import { LazyFramework } from '@h4ad/serverless-adapter/frameworks/lazy';
import { DefaultHandler } from '@h4ad/serverless-adapter/handlers/default';
import { PromiseResolver } from '@h4ad/serverless-adapter/resolvers/promise';
import { ApiGatewayV2Adapter } from '@h4ad/serverless-adapter/adapters/aws';
import { createApp } from './app';
import type { Context, Handler } from 'aws-lambda';

const handler = ServerlessAdapter.new(null)
  .setFramework(new LazyFramework(new FastifyFramework(), createApp))
  .setHandler(new DefaultHandler())
  .setResolver(new PromiseResolver())
  .addAdapter(new ApiGatewayV2Adapter())
  .build();

// @h4ad/serverless-adapter が作る handler 関数は (event, context, callback) の 3引数型だが
// nodejs24.x から AWS Lambda は callback 引数を受け付けなくなったので、
// async 関数に変換してから export する
type AsyncHandler<TEvent = unknown, TResult = unknown> = (
  event: TEvent,
  context: Context,
) => Promise<TResult>;

type AsyncHandlerFactory = (fn: Handler) => AsyncHandler;

const wrapCallbackFunction: AsyncHandlerFactory = (fn) => async (event, context) =>
  new Promise((resolve, reject) => {
    fn(event, context, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });

module.exports = { handler: wrapCallbackFunction(handler) };
