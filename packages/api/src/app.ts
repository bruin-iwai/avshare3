import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import expressBasicAuth, { safeCompare } from 'express-basic-auth';
import { apiRouter } from '~/api';
import { getSectets } from '~/repositories/getSecrets';
import type { SecretCredentials } from './api/indexSchema';

export const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());

// basic auth
app.use(
  expressBasicAuth({
    authorizeAsync: true,
    authorizer(
      usernameInput: string,
      passwordInput: string,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      done: (err: any, authed?: boolean) => void,
    ) {
      (async () => {
        const { username, password } = JSON.parse(
          (await getSectets(process.env.SECRET_ID!)) as string,
        ) as SecretCredentials;
        const userMatches = safeCompare(usernameInput, username);
        const passwordMatches = safeCompare(passwordInput, password);
        done(null, userMatches && passwordMatches);
      })().catch(done);
    },
  }),
);

app.get('/', (_req, res) => {
  res.send('Hello world');
});

app.use('/api', apiRouter);
