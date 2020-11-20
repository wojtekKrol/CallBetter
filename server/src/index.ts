import cors from 'cors';
import express, { Request, Response } from 'express';
const app = express();

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Hello World!');
});

app.listen(8000, () => {
  // eslint-disable-next-line no-console
  console.log('Server Started at Port, 8000');
});
