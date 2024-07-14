import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import timeSafeCompare from 'tsscmp';
import { apiRouter } from '~/api';

export const app = express();
// const port = parseInt(process.env.PORT || '80', 10);

app.use(helmet());
app.use(cors());
app.use(compression());

// basic auth
app.use((req, res, next) => {
  console.log(`Authorization: ${req.header('Authorization')}`);
  const challengeToken = `Basic ${Buffer.from(
    `${process.env.USERNAME ?? ''}:${process.env.PASSWORD ?? ''}`,
  ).toString('base64')}`;
  if (!timeSafeCompare(challengeToken, req.header('Authorization') ?? '')) {
    res.sendStatus(403);
  } else {
    next();
  }
});

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.use('/api', apiRouter);

// app.listen(port, () => {
//   console.log(`App started on port ${port}`);
// });
