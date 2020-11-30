import { SnackbarProvider } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Routing from './Routing';
import { useUser } from './api/actions/useUser';
import Loading from './components/Loading';
import UserContext from './lib/UserContext';
const App = () => {
  const [user, loading, setUser] = useUser() || {};
  const [auth, setAuth] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const userAuthStatus = user.logged ? 'auth' : 'no-auth';
    setAuth(userAuthStatus);
  }, [user]);

  if (loading || auth === null) {
    return <Loading />;
  }

  return (
    <UserContext.Provider value={{ user, loading, setUser }}>
      <SnackbarProvider
        dense
        autoHideDuration={3000}
        maxSnack={3}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}>
        <TransitionGroup>
          <CSSTransition key={location.key} timeout={450} classNames="fade">
            <Routing auth={auth} />
          </CSSTransition>
        </TransitionGroup>
      </SnackbarProvider>
    </UserContext.Provider>
  );
};

export default App;
