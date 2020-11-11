import React from 'react';
import Layout from '../components/Layout/Layout';
import styled from 'styled-components';
import './styles/home.css';
import InfoIcon from '../components/SVG/InfoIcon';
import { Link } from 'react-router-dom';
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
  return (
    <div className="videoWrapper">
      <div className="videoButtonWrapper">
        <button className="videoCreateRoom">Create room</button>
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
    { name: 'Mati', startTime: '19:38', endTime: '19:44' }
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
      <button className="historyButton">Show more</button>
    </div>
  );
};
