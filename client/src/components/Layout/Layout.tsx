import React from 'react';

import Navbar from '../Navbar/Navbar';
import { ChildrenContainer, Container, Overlay } from './Components';

interface LayoutProps {
  welcomeScreen?: boolean;
  authForm?: boolean;
  children?: React.ReactNode;
}

const Layout = ({ welcomeScreen, children, authForm }: LayoutProps) => {
  return (
    <Container welcomeScreen={welcomeScreen}>
      <Overlay welcomeScreen={welcomeScreen}>
        <Navbar welcomeScreen={welcomeScreen} authForm={authForm} />
        <ChildrenContainer>{children}</ChildrenContainer>
      </Overlay>
    </Container>
  );
};

export default Layout;
