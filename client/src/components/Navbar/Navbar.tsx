import React from 'react';
import { Nav, AuthButton } from './Components';
import Logo from '../Logo';
import {
  mainNavConfigUser,
  mainNavConfigAnonymous,
  ForSessionState
} from '../../constants/ConfigLayout';
import { useHistory } from 'react-router-dom';

interface NavbarProps {
  welcomeScreen?: boolean;
  authForm?: boolean;
}

const Navbar = ({ welcomeScreen, authForm }: NavbarProps) => {
  const history = useHistory();
  //TODO: create hook that will check if user is logged
  // const profile = useProfile() || {}
  const profile = true;

  const navigation = profile ? mainNavConfigUser : mainNavConfigAnonymous;

  return (
    <Nav welcomeScreen={welcomeScreen}>
      <Logo />
      {!authForm &&
        navigation.map((subpage) => (
          <AuthButton
            key={subpage.route}
            welcomeScreen={subpage?.ws}
            logOut={subpage.showFor === ForSessionState.AUTH}
            onClick={() => history.push(subpage.route)}>
            {subpage.label}
          </AuthButton>
        ))}
    </Nav>
  );
};

export default Navbar;
