import { SnackbarProvider } from 'notistack';
import React, { useEffect, useState } from 'react';

import Routing from './Routing';
import { useUser } from './api/actions/useUser';
import Loading from './components/Loading';
import UserContext from './lib/UserContext';
const App = () => {
  const [user, loading, setUser] = useUser() || {};
  const [auth, setAuth] = useState<string>('no-auth');

  useEffect(() => {
    const userAuthStatus = user.logged ? 'auth' : 'no-auth';
    setAuth(userAuthStatus);
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <UserContext.Provider value={{ user, loading, setUser }}>
      <SnackbarProvider
        dense
        autoHideDuration={5000}
        disableWindowBlurListener
        maxSnack={3}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}>
        <Routing auth={auth} />
      </SnackbarProvider>
    </UserContext.Provider>
  );
};

export default App;
