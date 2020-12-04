/* eslint-disable no-console */
/* eslint-disable no-void */
//@ts-nocheck
import chalk from 'chalk';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import socketIo from 'socket.io';

import callsRouter from './routes/callRouter';
import usersRouter from './routes/userRouter';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

const server: http.Server = http.createServer(app);
server.listen(<number>PORT, () => {
  console.log(
    chalk.blue.bold(`Server is running on http://localhost:${PORT} 🔥`),
  );
});

// @ts-ignore
const io = socketIo(server, {
  cors: true,
  origin: PORT,
});

io.on('connection', socket => {
  //subscribe to room
  const subscribe = room => {
    io.in(room).clients((error, clients) => {
      if (error) {
        throw error;
      }
      if (clients.length > 2) {
        socket.emit('session_active');
        return;
      }
      socket.join(room);
      rooms[room] = { users: [...clients] };

      if (clients.length < 2) {
        if (clients.length === 1) {
          socket.emit('create_host');
        }
      }
    });
  };

  //siganl offer to remote
  const sendOffer = (room, offer) => {
    socket.to(room).broadcast.emit('new_offer', offer);
  };

  //signal answer to remote
  const sendAnswer = (room, data) => {
    socket.to(room).broadcast.emit('new_answer', data);
  };

  //user disconnected
  const userDisconnected = room => {
    socket.to(room).broadcast.emit('end');
  };
  //events
  socket.on('subscribe', subscribe);
  socket.on('offer', sendOffer);
  socket.on('answer', sendAnswer);
  socket.on('user_disconnected', userDisconnected);
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

//set up routes
app.use('/users', usersRouter);
app.use('/call', callsRouter);
