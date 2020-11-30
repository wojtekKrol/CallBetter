import Axios from 'axios';
import { useState, useEffect } from 'react';

import { AUTH_TOKEN, SERVER_URL } from '../../constants/server';
import { State } from '../types/user';

export const useUser = () => {
  const [user, setUser] = useState<State>({
    token: undefined,
    userData: undefined,
    logged: undefined,
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const checkLoggedIn = async () => {
      let token = localStorage.getItem(AUTH_TOKEN);
      if (token === null) {
        localStorage.setItem(AUTH_TOKEN, '');
        token = '';
      }
      const tokenRes = await Axios.post(
        `${SERVER_URL}users/tokenIsValid`,
        null,
        {
          headers: { 'x-auth-token': token },
        },
      );
      if (tokenRes.data) {
        const userRes = await Axios.get(`${SERVER_URL}users/`, {
          headers: { 'x-auth-token': token },
        });

        setUser({
          token,
          userData: userRes.data,
          logged: true,
        });
      }
      setLoading(false);
    };

    // eslint-disable-next-line no-void
    void checkLoggedIn();
  }, []);
  return [user, loading, setUser] as const;
};
