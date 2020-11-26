import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import {
  mainNavConfigUser,
  mainNavConfigAnonymous,
  ForSessionState,
  LayoutItem,
} from '../../constants/ConfigLayout';
import RouteTypes from '../../constants/routes';
import UserContext from '../../lib/UserContext';
import Logo from '../SVG/Logo';
import { Nav, AuthButton } from './Components';

interface NavbarProps {
  welcomeScreen?: boolean;
  authForm?: boolean;
}

const Navbar = ({ welcomeScreen, authForm }: NavbarProps) => {
  const history = useHistory();
  const user = useContext(UserContext);

  const navigation: LayoutItem[] = user?.user?.logged
    ? mainNavConfigUser
    : mainNavConfigAnonymous;

  const handleClick = (route: string) => {
    if (route === RouteTypes.INDEX) {
      localStorage.setItem('auth-token', '');
      user.setUser({ logged: false, userDate: undefined, token: '' });
      history.push(route);
    } else {
      history.push(route);
    }
  };

  return (
    <Nav welcomeScreen={welcomeScreen}>
      <Logo />
      {!authForm &&
        navigation.map((subpage: LayoutItem) => (
          <AuthButton
            key={subpage.route}
            welcomeScreen={subpage?.ws}
            logOut={subpage.showFor === ForSessionState.AUTH}
            onClick={() => handleClick(subpage.route)}>
            {subpage.label}
          </AuthButton>
        ))}
    </Nav>
  );
};

export default Navbar;
