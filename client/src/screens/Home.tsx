import Axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { CallStatuses } from '../api/types/call';
import Layout from '../components/Layout/Layout';
import './styles/home.css';
import InfoIcon from '../components/SVG/InfoIcon';
import { AUTH_TOKEN, SERVER_URL } from '../constants/server';
import UserContext from '../lib/UserContext';

const Home = () => {
  return (
    <Layout>
      <Container>
        <HistorySection>
          <HitoryPreview />
        </HistorySection>
        <VideoSection>
          <CameraPreview />
        </VideoSection>
      </Container>
    </Layout>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  height: 700px;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;
const HistorySection = styled.div`
  flex-grow: 1;
`;
const VideoSection = styled.div`
  flex-grow: 3;
`;

const CameraPreview = () => {
  const { enqueueSnackbar } = useSnackbar();
  const user = useContext(UserContext);
  const history = useHistory();

  const createCall = async (e: any) => {
    e.preventDefault();
    try {
      const hostId: string = user?.user?.userData?.id;
      const status = CallStatuses.OPENED;
      const token = localStorage.getItem(AUTH_TOKEN);
      const newCall = await Axios.post(
        `${SERVER_URL}call/createCall`,
        { hostId, status },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        },
      );

      enqueueSnackbar('Call room created.', { variant: 'success' });
      history.push(`/call/${newCall?.data?.id}`);
    } catch (error) {
      const msg = error.response.data.msg;
      msg && enqueueSnackbar(msg, { variant: 'error' });
    }
  };

  return (
    <div className="videoWrapper">
      <video autoPlay playsInline />
      <div className="videoButtonWrapper">
        <button className="videoCreateRoom" onClick={createCall}>
          Create room
        </button>
      </div>
    </div>
  );
};

type CallHistoryRecord = {
  name: string;
  startTime: string;
  endTime: string;
};

const HitoryPreview = () => {
  const historyRecords = [
    { name: 'Mati', startTime: '19:38', endTime: '19:44' },
    { name: 'Mati', startTime: '19:38', endTime: '19:44' },
    { name: 'Mati', startTime: '19:38', endTime: '19:44' },
    { name: 'Mati', startTime: '19:38', endTime: '19:44' },
    { name: 'Mati', startTime: '19:38', endTime: '19:44' },
    { name: 'Mati', startTime: '19:38', endTime: '19:44' },
    { name: 'Mati', startTime: '19:38', endTime: '19:44' },
    { name: 'Mati', startTime: '19:38', endTime: '19:44' },
    { name: 'Mati', startTime: '19:38', endTime: '19:44' },
    { name: 'Mati', startTime: '19:38', endTime: '19:44' },
    { name: 'Mati', startTime: '19:38', endTime: '19:44' },
  ];

  return (
    <div className="historyWrapper">
      <div className="historyTitle">Connection history</div>
      <div className="historyRecords">
        {historyRecords.map((record: CallHistoryRecord) => (
          <div className="historyRecord">
            <div className="recordName">{record.name}</div>
            <div>
              {record.startTime} <Link to="/home" component={InfoIcon} />
            </div>
          </div>
        ))}
      </div>
      <button className="historyButton" onClick={() => console.log('ts')}>
        Show more
      </button>
    </div>
  );
};
