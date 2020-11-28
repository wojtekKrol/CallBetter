import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

import Layout from '../components/Layout/Layout';
import Participants from '../components/VideoCall/Participants';
import Toolbar from '../components/VideoCall/Toolbar';
import { SERVER_URL } from '../constants/server';

const VideoCall = () => {
  // @ts-ignore
  useEffect(() => {
    const socket = socketIOClient(`${SERVER_URL}`);

    socket.on('gitaraSiema', (data: any) => {
      console.log(data);
    });
    return () => socket.disconnect();
  });

  return (
    <Layout>
      <Participants />
      <Toolbar />
    </Layout>
  );
};

export default VideoCall;
