import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Peer from 'simple-peer';
import socketIOClient from 'socket.io-client';

import { SERVER_URL } from '../../constants/server';
import Toolbar from './Toolbar';

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

const socket = socketIOClient(SERVER_URL);

const Participants = () => {
  const cx = useStyles();
  const params = useParams();
  // @ts-ignore
  const roomName = params.callId;
  const client = useCallback(() => {}, []);
  const token = localStorage.getItem('auth-token');
  const localStream: any = useRef<any>();
  const hostStream = useRef<any>(null);
  const remoteStream = useRef<any>(null);
  const [roomExists, setRoomExists] = useState(true);

  const endCall = useCallback(() => {
    socket.emit('userDisconnected', roomName);
    end();
  }, [roomName]);

  //end connection
  const end = () => {
    window.location.href = '/';
  };

  const getMedia = useCallback(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream: MediaStream) => {
        //set media stream
        localStream.current = stream;
        hostStream.current.srcObject = stream;
        //subscribe to room
        socket.emit('subscribe', roomName);

        //peer constructor
        const initPeer = (type: string) => {
          const peer = new Peer({
            initiator: type === 'init',
            stream: localStream.current,
            trickle: false,
          });
          peer.on('stream', (stream: any) => {
            remoteStream.current.srcObject = stream;
          });
          return peer;
        };

        //create initiator
        const createHost = () => {
          // @ts-ignore
          client.gotAnswer = false;
          const peer = initPeer('init');
          peer.on('signal', (data: any) => {
            // @ts-ignore
            if (!client.gotAnswer) {
              socket.emit('offer', roomName, data);
            }
          });
          // @ts-ignore
          client.peer = peer;
        };

        //create remote
        const createRemote = (offer: any) => {
          const peer = initPeer('notinit');
          peer.on('signal', (data: any) => {
            socket.emit('answer', roomName, data);
          });
          peer.signal(offer);
          // @ts-ignore
          client.peer = peer;
        };

        //handle answer
        const handleAnswer = (answer: any) => {
          // @ts-ignore
          client.gotAnswer = true;
          // @ts-ignore
          const peer = client.peer;
          peer.signal(answer);
        };

        const sessionActive = () => {
          alert('session active');
        };

        //socket events
        socket.on('createHost', createHost);
        socket.on('newOffer', createRemote);
        socket.on('newAnswer', handleAnswer);
        socket.on('end', endCall);
        socket.on('sessionActive', sessionActive);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }, [client, endCall, roomName]);

  const getRoomStatus = useCallback(async () => {
    try {
      const response = await Axios.post(
        `${SERVER_URL}call/room`,
        { roomName },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        },
      );
      if (response.data.msg === 'room_exists') {
        setRoomExists(true);
        getMedia();
      } else if (response.data.msg === 'room_does_not_exist') {
        setRoomExists(false);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }, [getMedia, roomName, token]);

  useEffect(() => {
    // eslint-disable-next-line no-void
    void getRoomStatus();
    return console.info('Unmounted');
  }, [getRoomStatus]);

  //disable video
  const disableVideo = () => {
    const videoTracks = localStream.current.getVideoTracks();
    for (let i = 0; i < videoTracks.length; ++i) {
      videoTracks[i].enabled = !videoTracks[i].enabled;
    }
  };

  //disable audio
  const disableAudio = () => {
    const audioTracks = localStream.current.getAudioTracks();
    for (let i = 0; i < audioTracks.length; ++i) {
      audioTracks[i].enabled = !audioTracks[i].enabled;
    }
  };

  return (
    <div>
      {roomExists && (
        <>
          <div className={cx.grid}>
            <div>
              remote
              <video
                ref={remoteStream}
                className={cx.video}
                autoPlay
                playsInline
              />
            </div>
            <div>
              local
              <video
                ref={hostStream}
                className={cx.video}
                autoPlay
                playsInline
              />
            </div>
          </div>

          <Toolbar
            disableAudio={disableAudio}
            disableVideo={disableVideo}
            endCall={endCall}
          />
        </>
      )}
    </div>
  );
};

export default Participants;
