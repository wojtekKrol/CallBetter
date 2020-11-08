import React from 'react';
import { Nav, AuthButton } from './Components';
import Logo from '../Logo';

interface NavbarProps {
  welcomeScreen?: boolean;
}

const Navbar = ({ welcomeScreen }: NavbarProps) => {
  return (
    <Nav welcomeScreen={welcomeScreen}>
      <Logo />
      <AuthButton onClick={() => console.log('elo')}>Log in</AuthButton>
    </Nav>
  );
};

export default Navbar;
