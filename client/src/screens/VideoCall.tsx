import React from 'react';

import Layout from '../components/Layout/Layout';
import Participants from '../components/VideoCall/Participants';
import Toolbar from '../components/VideoCall/Toolbar';

const VideoCall = () => {
  return (
    <Layout>
      <Participants />
      <Toolbar />
    </Layout>
  );
};

export default VideoCall;
