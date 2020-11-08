import React from 'react';
import Layout from '../components/Layout/Layout';
import styled from 'styled-components';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 80vh;
`;

const Text = styled.div`
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 96px;
  line-height: 100%;
  display: flex;
  align-items: center;
  color: #ffffff;
  margin-left: 10px;
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
`;

const WelcomeScreen = () => {
  return (
    <Layout welcomeScreen>
      <Content>
        <Text>anyone</Text>
        <Text>anytime</Text>
        <Text>anywhere</Text>
        <TryButton>Try for free</TryButton>
      </Content>
    </Layout>
  );
};

export default WelcomeScreen;
