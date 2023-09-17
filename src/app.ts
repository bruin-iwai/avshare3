import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import { default as compare } from 'tsscmp';
import auth from 'basic-auth';
import { apiRouter } from '~/api';

const app = express();
const port = parseInt(process.env.PORT || '80', 10);

app.use(helmet());
app.use(cors());
app.use(compression());

// basic auth
app.use((req, res, next) => {
  const check = (name: string, pass: string): boolean =>
    Boolean(name) &&
    Boolean(pass) &&
    compare(name, process.env.USERNAME || '') &&
    compare(pass, process.env.PASSWORD || '');
  const credentials = auth(req);

  if (!credentials || !check(credentials.name, credentials.pass)) {
    res.setHeader('WWW-Authenticate', 'Basic realm="avshare3"');
    res.sendStatus(401);
  } else {
    next();
  }
});

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
