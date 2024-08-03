import Fastify from 'fastify';
import fastifyHelmet from '@fastify/helmet';
import fastifyCors from '@fastify/cors';
import fastifyCompress from '@fastify/compress';
import fastifyBasicAuth from '@fastify/basic-auth';
import { apiRouter } from '~/api';

const app = Fastify();

app.register(fastifyHelmet);
app.register(fastifyCors);
app.register(fastifyCompress);

// basic auth
app.register(fastifyBasicAuth, {
  authenticate: {
    realm: 'avshare3',
  },
  validate(username, password, _req, _reply, done) {
    if (username === process.env.USERNAME && password === process.env.PASSWORD) {
      done();
    } else {
      done(new Error('Credentials mismatch'));
    }
  },
});

app.get('/', async (_request, _reply) => {
  return { message: 'Hello world' };
});

app.register(apiRouter, { prefix: '/api' });

export { app };
