import { createApp } from './app';

const port = parseInt(process.env.PORT ?? '3000', 10);

(async () => {
  const fastify = await createApp();
  fastify.listen({ port, host: '0.0.0.0' }, (err, _address) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    // console.log(`Server is now listening on ${address}`);
  });
})();
