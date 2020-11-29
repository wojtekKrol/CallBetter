// @ts-nocheck
import Axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import socketIOClient from 'socket.io-client';

import Layout from '../components/Layout/Layout';
import Participants from '../components/VideoCall/Participants';
import Toolbar from '../components/VideoCall/Toolbar';
import { SERVER_URL } from '../constants/server';
import UserContext from '../lib/UserContext';

const VideoCall = () => {
  const user = useContext(UserContext);

  const userId = user?.user?.userData?.id;
  useEffect(() => {
    const upsertCall = () => {
      try {
        const token = localStorage.getItem('auth-token');

        Axios.post(`${SERVER_URL}call/${callId}`, userId, {
          headers: {
            'x-auth-token': token,
            callId,
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.log(error.response.data.msg);
      }
    };
    upsertCall();
  }, []);

  return (
    <Layout>
      <Participants />
      <Toolbar />
    </Layout>
  );
};

export default VideoCall;
