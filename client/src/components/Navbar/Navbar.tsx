import React from 'react';
import { Nav, AuthButton } from './Components';
import Logo from '../Logo';
import { mainNavConfigUser, mainNavConfigAnonymous } from '../../constants/ConfigLayout';
import { useHistory } from 'react-router-dom';

interface NavbarProps {
  welcomeScreen?: boolean;
}

const Navbar = ({ welcomeScreen }: NavbarProps) => {
  const history = useHistory();
  //TODO: create hook that will check if user is logged
  // const profile = useProfile() || {}
  const profile = false;

  const navigation = profile ? mainNavConfigUser : mainNavConfigAnonymous;

  return (
    <Nav welcomeScreen={welcomeScreen}>
      <Logo />
      {navigation.map((subpage) => (
        <AuthButton
          key={subpage.route}
          welcomeScreen={subpage?.ws}
          onClick={() => history.push(subpage.route)}>
          {subpage.label}
        </AuthButton>
      ))}
    </Nav>
  );
};

export default Navbar;
