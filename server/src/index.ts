/* eslint-disable no-console */
import chalk from 'chalk';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

import { DATABASE } from './config';
import userRouter from './userRouter';

// eslint-disable-next-line no-void
void mongoose.connect(DATABASE.MONGO_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('error', console.error);
mongoose.connection.once('open', () =>
  console.log(chalk.cyan('MongoDB connected')),
);

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//set up routes
app.use('/users', userRouter);
