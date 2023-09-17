import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import { apiRouter } from '~/api';

const app = express();
const port = parseInt(process.env.PORT || '80', 10);

app.use(helmet());
app.use(cors());
app.use(compression());

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
