import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import mobile from '../assets/mobile.png';
import Layout from '../components/Layout/Layout';
import RouteTypes from '../constants/routes';
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 80vh;
  @media (max-width: 400px) {
    height: 100%;
  }
`;

const Text = styled.div`
  font-family: Montserrat, sans-serif;
  z-index: 2;
  font-style: normal;
  font-weight: 800;
  font-size: 96px;
  line-height: 100%;
  display: flex;
  align-items: center;
  color: #ffffff;
  margin-left: 10px;
  @media (max-width: 400px) {
    font-size: 30px;
    justify-content: flex-end;
  }
`;

const TryButton = styled.div`
  /* Rectangle 8 */
  display: flex;
  margin: 40px 10px;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 80px;
  background: #ffffff;
  border-radius: 8px;
  font-size: 24px;
  color: #5e27d1;

  &:hover {
    cursor: pointer;
    border: solid white;
    color: white;
    background: transparent;
    transition: all 0.2s ease-in-out;
  }
  @media (max-width: 400px) {
    margin: 50px auto 0 auto;
    width: 100%;
    height: 60px;
    font-size: 20px;
  }
`;

const WelcomeScreen = () => {
  const [width, setWidth] = useState(window.screen.availWidth);
  window.addEventListener('resize', () => setWidth(window.screen.availWidth));

  return (
    <Layout welcomeScreen>
      <Content>
        {width <= 400 && (
          <img
            src={mobile}
            alt="mobile"
            style={{
              maxHeight: '367px',
              maxWidth: '300px',
              zIndex: 1,
              margin: '-20px auto',
            }}
          />
        )}
        <Text>anyone</Text>
        <Text>anytime</Text>
        <Text>anywhere</Text>
        <Link style={{ textDecoration: 'none' }} to={RouteTypes.SIGN_UP}>
          <TryButton> Try for free </TryButton>
        </Link>
      </Content>
    </Layout>
  );
};

export default WelcomeScreen;
