import { Backdrop, CircularProgress } from '@material-ui/core';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import ROUTES from '../constants/routes';

const CustomRoute = ({ component: Component, ...rest }: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const user = rest?.user;

  const profileKeys = Object.keys(user?.userData);

  const requiredFields = [
    'name',
    'about',
    'birthday',
    'gender',
  ].every((key: string) => profileKeys.includes(key));

  if (profileKeys.length === 0) {
    return (
      <Backdrop open>
        <CircularProgress color="primary" />
      </Backdrop>
    );
  }

  return (
    <Route
      {...rest}
      render={(props: any) =>
        requiredFields ? (
          <Component {...props} />
        ) : (
          <Redirect to={ROUTES.CREATE_PROFILE} />
        )
      }
    />
  );
};

export default CustomRoute;
