import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import expressBasicAuth, { safeCompare } from 'express-basic-auth';
import { apiRouter } from '~/api';

export const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());

// basic auth
app.use(
  expressBasicAuth({
    authorizer(username: string, password: string) {
      const userMatches = safeCompare(username, process.env.USERNAME ?? '');
      const passwordMatches = safeCompare(password, process.env.PASSWORD ?? '');
      return userMatches && passwordMatches;
    },
  }),
);

app.get('/', (_req, res) => {
  res.send('Hello world');
});

app.use('/api', apiRouter);
