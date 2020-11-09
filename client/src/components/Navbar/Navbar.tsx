import React from 'react';
import { Nav, AuthButton } from './Components';
import Logo from '../Logo';
import { mainNavConfigUser, mainNavConfigAnonymous } from '../../constants/ConfigLayout';
import { Link, useHistory } from 'react-router-dom';
import RouteTypes from '../../constants/routes';

interface NavbarProps {
  welcomeScreen?: boolean;
  authForm?: boolean;
}

const Navbar = ({ welcomeScreen, authForm }: NavbarProps) => {
  const history = useHistory();
  //TODO: create hook that will check if user is logged
  // const profile = useProfile() || {}
  const profile = false;

  const navigation = profile ? mainNavConfigUser : mainNavConfigAnonymous;

  return (
    <Nav welcomeScreen={welcomeScreen}>
      <Logo />
      {!authForm &&
        navigation.map((subpage) => (
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
