import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  mainNavConfigUser,
  mainNavConfigAnonymous,
  ForSessionState,
  LayoutItem,
} from '../../constants/ConfigLayout';
import RouteTypes from '../../constants/routes';
import { AUTH_TOKEN } from '../../constants/server';
import UserContext from '../../lib/UserContext';
import DialogAlert from '../DialogAlert';
import Logo from '../SVG/Logo';
import { Nav, AuthButton } from './Components';

interface NavbarProps {
  welcomeScreen?: boolean;
  authForm?: boolean;
}

const Navbar = ({ welcomeScreen, authForm }: NavbarProps) => {
  const history = useHistory();
  const user = useContext(UserContext);

  const title = 'Are you sure you want to sign out?';
  const closeText = 'Back';
  const confirmText = 'Sign out';
  const [open, setOpen] = useState(false);

  const confirmedCallLeave = () => {
    localStorage.setItem(AUTH_TOKEN, '');
    user.setUser({ logged: false, userDate: undefined, token: '' });
    history.push('/');
  };

  const navigation: LayoutItem[] = user?.user?.logged
    ? mainNavConfigUser
    : mainNavConfigAnonymous;

  const handleClick = (route: string) => {
    if (route === RouteTypes.INDEX) {
      setOpen(true);
    } else {
      history.push(route);
    }
  };

  return (
    <>
      <DialogAlert
        title={title}
        confirmText={confirmText}
        closeText={closeText}
        state={open}
        setStateBack={setOpen}
        confirmFunction={confirmedCallLeave}
      />
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
    </>
  );
};

export default Navbar;
