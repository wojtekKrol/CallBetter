import React from 'react';
import Navbar from '../Navbar/Navbar';
import { ChildrenContainer, Container, Overlay } from './Components';

interface LayoutProps {
  welcomeScreen?: boolean;
  children?: React.ReactNode;
}

const Layout = ({ welcomeScreen, children }: LayoutProps) => {
  return (
    <Container welcomeScreen={welcomeScreen}>
      <Overlay>
        <Navbar welcomeScreen={welcomeScreen} />
        <ChildrenContainer>{children}</ChildrenContainer>
      </Overlay>
    </Container>
  );
};

export default Layout;
