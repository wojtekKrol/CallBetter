/* eslint-disable no-console */
/* eslint-disable no-void */
import chalk from 'chalk';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import socketIo, { Socket } from 'socket.io';

import callsRouter from './routes/callRouter';
import usersRouter from './routes/userRouter';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server: http.Server = http.createServer(app);
server.listen(<number>PORT, () => {
  console.log(
    chalk.blue.bold(`Server is running on http://localhost:${PORT} 🔥`),
  );
});

export const rooms: any = {};

// @ts-ignore
const io = socketIo(server, {
  cors: true,
  origin: PORT,
});

io.on('connection', (socket: Socket) => {
  const subscribe = (room: string) => {
    io.in(room).clients((error: any, clients: any) => {
      if (error) {
        throw error;
      }
      if (clients.length > 2) {
        socket.emit('sessionActive');
        return;
      }
      socket.join(room);
      rooms[room] = { users: [...clients] };

      console.group('ROOM INFO');
      console.log('ROOM', room);
      console.log('USERS', rooms[room]);
      console.groupEnd();

      if (clients.length < 2) {
        if (clients.length === 1) {
          console.log('HOST CREATED');
          return socket.emit('createHost');
        }
      }
    });
  };
  //siganl offer to remote
  const sendOffer = (room: string, offer: any) => {
    socket.to(room).emit('newOffer', offer);
  };
  //signal answer to remote
  const sendAnswer = (room: string, data: any) => {
    socket.to(room).broadcast.emit('newAnswer', data);
  };
  //user disconnected
  const userDisconnected = (room: string) => {
    socket.to(room).broadcast.emit('end');
  };

  //events
  socket.on('subscribe', subscribe);
  socket.on('offer', sendOffer);
  socket.on('answer', sendAnswer);
  socket.on('userDisconnected', userDisconnected);
});

//MONGO
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

//set up routes
app.use('/users', usersRouter);
app.use('/call', callsRouter);
