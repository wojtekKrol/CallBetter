import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar/Navbar';
import img from '../assets/img.jpg';

const Container = styled.div<{ welcomeScreen?: boolean }>`
  height: 100vh;
  width: 100%;
  background: ${({ welcomeScreen }) => (welcomeScreen ? 'url(' + img + ')' : 'white')};
  background-size: cover;
`;

const Overlay = styled.div`
  height: 100%;
  background: linear-gradient(
    227.23deg,
    rgba(158, 0, 255, 0.54) 4.03%,
    rgba(112, 0, 255, 0.54) 91.25%
  );
`;

interface LayoutProps {
  welcomeScreen?: boolean;
  children?: React.ReactNode;
}

const Layout = ({ welcomeScreen, children }: LayoutProps) => {
  return (
    <Container welcomeScreen={welcomeScreen}>
      <Overlay>
        <Navbar welcomeScreen={welcomeScreen} />
        {children}
      </Overlay>
    </Container>
  );
};

export default Layout;
