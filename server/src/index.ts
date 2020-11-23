/* eslint-disable no-console */
/* eslint-disable no-void */
import chalk from 'chalk';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

dotenv.config();

const { MONGO_URI } = process.env;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
void mongoose.connect(MONGO_URI, {
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

app.use(cors());
app.use(express.json());

app.listen(<number>PORT, () => {
  console.log(chalk.blue.bold(`Server is running on http://localhost:${PORT}`));
});

// doesn't need since docker image have tini package manager
// process.on('SIGTERM', (): void => {
//   process.exit();
// });
