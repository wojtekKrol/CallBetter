/* eslint-disable no-console */
/* eslint-disable no-void */
import chalk from 'chalk';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import socketIo from 'socket.io';

import callsRouter from './routes/callRouter';
import usersRouter from './routes/userRouter';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ExpressPeerServer = require('peer').ExpressPeerServer;

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

const server: http.Server = http.createServer(app);
// @ts-ignore
const io = socketIo(server, {
  cors: {
    origin: PORT,
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket: any) => {
  socket.on('join-call', (callId: any, userId: any) => {
    socket.join(callId);
    socket.to(callId).broadcast.emit('user-connected', userId);

    socket.on('disconnect', () => {
      socket.to(callId).broadcast.emit('user-disconnected', userId);
    });
  });
});

const { MONGO_URI } = process.env;

mongoose.set('returnOriginal', true);
// @ts-ignore
void mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', console.error);
mongoose.connection.once('open', () => {
  console.log(chalk.yellow.bold('MongoDB connected 🚀'));
});

const peerServer = ExpressPeerServer(server);

server.listen(<number>PORT, () => {
  console.log(
    chalk.blue.bold(`Server is running on http://localhost:${PORT} 🔥`),
  );
});

//set up routes
app.use('/', peerServer);
app.use('/users', usersRouter);
app.use('/call', callsRouter);
