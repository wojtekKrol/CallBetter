/* eslint-disable no-console */
import chalk from 'chalk';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import { DATABASE } from './config';

dotenv.config();
// eslint-disable-next-line no-void
void mongoose.connect(DATABASE.MONGO_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('error', console.error);
mongoose.connection.once('open', () =>
  console.log(chalk.yellow.bold('MongoDB connected')),
);

const PORT = process.env.PORT || 5000;
const app = express();

console.log(DATABASE);
console.log(process.env.MONGO_PASSWORD);
app.use(cors());
app.use(express.json());

app.get('/elo', (req, res) => {
  res.send('Hello World');
});
app.listen(<number>PORT, () => {
  console.log(chalk.blue.bold(`Server is running on http://localhost:${PORT}`));
});
