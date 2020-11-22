/* eslint-disable no-console */
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

import { DATABASE } from './config';

// eslint-disable-next-line no-void
void mongoose.connect(DATABASE.MONGO_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('error', console.error);
mongoose.connection.once('open', () => console.log('MongoDB connected'));

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/elo', (req, res) => {
  res.send('Hello World');
});

app.listen(<number>PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
