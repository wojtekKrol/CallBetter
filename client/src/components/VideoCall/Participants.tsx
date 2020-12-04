import { makeStyles } from '@material-ui/core/styles';
import Peer from 'peerjs';
import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import socketIOClient from 'socket.io-client';

import { PEERJS_URL, SERVER_URL } from '../../constants/server';

const useStyles = makeStyles((theme) => ({
  grid: {
    display: 'grid',
    justifyContent: 'center',
    height: '60vh',
    gridGap: '10px',
    gridTemplateColumns: 'repeat(2, 45%)',
    overflow: 'hidden',
    [theme.breakpoints.down('xs')]: {
      height: '70vh',
      display: 'flex',
      flexDirection: 'column',
    },
  },
  video: {
    maxWidth: '100%',
    minWidth: '100%',
    maxHeight: '100%',
    minHeight: '100%',
    objectFit: 'contain',
  },
}));

const Participants = () => {
  const cx = useStyles();
  const peer = new Peer(undefined, {
    host: PEERJS_URL,
    secure: true,
    port: 443,
  });

  const params = useParams();
  // @ts-ignore
  const callId = params.callId;
  const refMyVideo = useRef<any>();
  const refVideo = useRef<any>();
  const socket = socketIOClient(SERVER_URL);
  const peers: any = {};

  console.group('PEER');
  console.log('peer', peer);

  peer.on('open', (id: any) => {
    console.log('PEER ID', id);
  });
  console.groupEnd();

  console.group('RERENDER');
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: true,
    })
    .then((stream: MediaStream) => {
      socket.on('user-connected', (userId: string) => {
        console.log(`USER ${userId} CONNECTED`);
        peers[userId] = userId;
      });
    })
    .catch(console.error);

  socket.on('user-disconnected', (userId: string) => {
    console.log(`USER ${userId} DISCONNECTED`);
  });

  peer.on('open', (userId: string) => {
    console.log(`PEER OPEN with ${userId}`);
    socket.emit('join-call', callId, userId);
  });

  console.groupEnd();

  return (
    <div className={cx.grid}>
      <div>
        <video className={cx.video} ref={refVideo} autoPlay />
        <audio muted />
      </div>
      <div>
        <video className={cx.video} ref={refMyVideo} autoPlay />
        <audio muted />
      </div>
    </div>
  );
};

export default Participants;
