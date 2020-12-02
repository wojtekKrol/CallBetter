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
  const peer = new Peer({ host: PEERJS_URL, secure: true, port: 443 });

  const params = useParams();
  const refMyVideo = useRef<any>();
  const refVideo = useRef<any>();
  const socket = socketIOClient(SERVER_URL);
  const peers: any = {};

  function addVideoStream(video: any, stream: any) {
    if (video) {
      video.srcObject = stream;
      refMyVideo.current.src = video;
    }
  }

  function connectToNewUser(userId: string, stream: any) {
    const call = peer.call(userId, stream);

    call.on('stream', (userVideoStream: any) => {
      addVideoStream(refVideo.current, userVideoStream);
    });
    call.on('close', () => {
      refVideo.current.remove();
    });

    peers[userId] = call;
  }

  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: true,
    })
    .then((stream: MediaStream) => {
      addVideoStream(refMyVideo.current, stream);

      peer.on('call', (call: any) => {
        call.answer(stream);

        call.on('stream', (userVideoStream: any) => {
          addVideoStream(refVideo.current, userVideoStream);
        });
      });

      socket.on('user-connected', (userId: string) => {
        connectToNewUser(userId, stream);
      });
    })
    .catch(console.error);

  socket.on('user-disconnected', (userId: string) => {
    if (peers[userId]) {
      peers[userId].close();
    }
  });

  peer.on('open', (id: string) => {
    // @ts-ignore
    socket.emit('join-call', params.callId, id);
  });

  return (
    <div className={cx.grid}>
      {' '}
      <div>
        <video className={cx.video} ref={refVideo} autoPlay />
      </div>
      <div>
        <video className={cx.video} ref={refMyVideo} autoPlay />
      </div>
    </div>
  );
};

export default Participants;
