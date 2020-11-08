import React from 'react';
import styled from 'styled-components';
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

const Nav = styled.div<{ welcomeScreen?: boolean }>`
  padding: 0.5rem 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ welcomeScreen }) => (welcomeScreen ? 'transparent' : 'white')};
  box-shadow: 0px 4px 24px rgba(134, 98, 250, 0.25);
  z-index: 1;
`;

const AuthButton = styled.div`
  width: 140px;
  height: 50px;
  background: white;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-family: 'Montserrat SemiBold', sans-serif;
  color: #5e27d1;
`;

export default Navbar;
