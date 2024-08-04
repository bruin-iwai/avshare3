import { app } from './app';

const port = parseInt(process.env.PORT ?? '80', 10);
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
