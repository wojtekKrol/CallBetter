import React from 'react';
import Layout from '../components/Layout/Layout';
import Toolbar from '../components/VideoCall/Toolbar';
import Participants from '../components/VideoCall/Participants';

const VideoCall = () => {
  return (
    <Layout>
      <Participants />
      <Toolbar />
    </Layout>
  );
};

export default VideoCall;
