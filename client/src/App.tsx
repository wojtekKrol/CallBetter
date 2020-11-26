import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Routing from './Routing';
import { useUser } from './api/actions/useUser';
import UserContext from './lib/UserContext';

const App = () => {
  const [user, setUser] = useUser() || {};
  const [auth, setAuth] = useState<string>('no-auth');

  useEffect(() => {
    const userAuthStatus = user.logged ? 'auth' : 'no-auth';
    setAuth(userAuthStatus);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routing auth={auth} />
    </UserContext.Provider>
  );
};

export default App;
