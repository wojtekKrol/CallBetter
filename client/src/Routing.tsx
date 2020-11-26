import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import CustomRoute from './components/CustomRoute';
import ROUTES from './constants/routes';
import UserContext from './lib/UserContext';
import CreateProfile from './screens/CreateProfile';
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import VideoCall from './screens/VideoCall';
import WelcomeScreen from './screens/WelcomeScreen';

interface RoutingProps {
  auth: string;
}

const Routing = ({ auth }: RoutingProps) => {
  const userContext = useContext(UserContext);
  const user = userContext.user;

  switch (auth) {
    case 'auth':
      return (
        <Switch>
          <Route path={ROUTES.CREATE_PROFILE} component={CreateProfile} />
          <CustomRoute
            path={ROUTES.VIDEO_CALL}
            component={VideoCall}
            user={user}
          />
          <CustomRoute path={ROUTES.HOME} component={Home} user={user} />
          <Route path={ROUTES.INDEX} component={Home} exact />
          <Redirect to={ROUTES.HOME} />
        </Switch>
      );
    case 'no-auth':
      return (
        <Switch>
          <Route path={ROUTES.SIGN_UP} component={Register} />
          <Route path={ROUTES.LOG_IN} component={Login} />
          <Route path={ROUTES.HOME} component={WelcomeScreen} />
          <Route path={ROUTES.INDEX} component={WelcomeScreen} exact />
          <Redirect to={ROUTES.HOME} />
        </Switch>
      );
    default:
      return (
        <Switch>
          <Route path={ROUTES.HOME} component={WelcomeScreen} />
          <Route path={ROUTES.INDEX} component={WelcomeScreen} exact />
          <Redirect to={ROUTES.HOME} />
        </Switch>
      );
  }
};

export default Routing;
