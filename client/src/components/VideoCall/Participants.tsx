import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';
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

const Participants = () => {
  const cx = useStyles();
  const params = useParams();
  // @ts-ignore
  const roomName = params.callId;
  const client: { gotAnswer: any; peer: any } = { gotAnswer: null, peer: null };
  const token = localStorage.getItem('auth-token');
  let localStream: any;
  const hostStream = useRef<any>({});
  const remoteStream = useRef<any>({});
  const [roomExists, setRoomExists] = useState(true);
  const [errors, setErrors] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [gotStream, setGotStream] = useState(false);
  const socket = socketIOClient(SERVER_URL);

  const getRoomStatus = async () => {
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
        setModalVisible(true);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line no-void
    void getRoomStatus();
    return console.info('Unmounted');
  });

  const getMedia = () => {
    // @ts-ignore
    navigator.getMedia =
      // eslint-disable-next-line @typescript-eslint/unbound-method
      navigator.getUserMedia;
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream: MediaStream) => {
        //set media stream
        localStream = stream;
        hostStream.current.srcObject = stream;
        //subscribe to room
        socket.emit('subscribe', roomName);
        console.log('CLIENT SUBSCRIBE');
        //peer constructor
        const initPeer = (type: string) => {
          const peer = new Peer({
            initiator: type === 'init',
            stream: localStream,
            trickle: false,
          });
          peer.on('stream', (stream) => {
            setGotStream(true);
            remoteStream.current.srcObject = stream;
          });
          return peer;
        };

        //create initiator
        const createHost = () => {
          console.log('HOST');
          client.gotAnswer = false;
          const peer = initPeer('init');
          peer.on('signal', (data) => {
            if (!client.gotAnswer) {
              socket.emit('offer', roomName, data);
            }
          });
          client.peer = peer;
        };

        //create remote
        const createRemote = (offer: any) => {
          const peer = initPeer('notinit');
          console.log('REMOTE');
          peer.on('signal', (data) => {
            socket.emit('answer', roomName, data);
          });
          peer.signal(offer);
          client.peer = peer;
        };

        //handle answer
        const handleAnswer = (answer: any) => {
          client.gotAnswer = true;
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
        socket.on('end', end);
        socket.on('sessionActive', sessionActive);
      })
      .catch((error) => {
        //error alerts
        setErrors({
          msg:
            'App needs permissions to access media devices to work! Try again.',
        });
        setVisible(true);
        console.error(error);
      });
  };

  const endCall = () => {
    socket.emit('userDisconnected', roomName);
    end();
  };

  //end connection
  const end = () => {
    window.location.href = '/';
  };

  //disable video
  const disableVideo = () => {
    const videoTracks = localStream.getVideoTracks();
    for (let i = 0; i < videoTracks.length; ++i) {
      videoTracks[i].enabled = !videoTracks[i].enabled;
    }
  };

  //disable audio
  const disableAudio = () => {
    const audioTracks = localStream.getAudioTracks();
    for (let i = 0; i < audioTracks.length; ++i) {
      audioTracks[i].enabled = !audioTracks[i].enabled;
    }
  };

  return (
    <div>
      <div className={cx.grid}>
        <div>
          <video
            className={cx.video}
            autoPlay
            muted
            playsInline
            ref={remoteStream}
          />
        </div>
        <div>
          <video
            className={cx.video}
            autoPlay
            muted
            playsInline
            ref={hostStream}
          />
        </div>
      </div>

      <Toolbar
        disableAudio={disableAudio}
        disableVideo={disableVideo}
        endCall={endCall}
      />
    </div>
  );
};

export default Participants;
