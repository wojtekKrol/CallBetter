import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import WelcomeScreen from './screens/WelcomeScreen';
import ROUTES from './constants/routes';
import Register from './screens/Register';
import Login from './screens/Login';
import CreateProfile from './screens/CreateProfile';
import Home from './screens/Home';
import VideoCall from './screens/VideoCall';

const App = () => {
  //TODO: create hook that will check if user is logged
  // const profile = useProfile() || {}

  const isUser = 'logged';

  switch (isUser) {
    case 'logged':
      return (
        <Switch>
          <Route path={ROUTES.SIGN_UP} component={Register} />
          <Route path={ROUTES.LOG_IN} component={Login} />
          <Route path={ROUTES.CREATE_PROFILE} component={CreateProfile} />
          <Route path={ROUTES.VIDEO_CALL} component={VideoCall} />
          <Route path={ROUTES.HOME} component={Home} />
          <Route path={ROUTES.INDEX} component={WelcomeScreen} exact />
          <Redirect to={ROUTES.HOME} />
        </Switch>
      );
    default:
      return (
        <Switch>
          <Route path={ROUTES.SIGN_UP} component={Register} />
          <Route path={ROUTES.LOG_IN} component={WelcomeScreen} />
          <Route path={ROUTES.HOME} component={WelcomeScreen} />
          <Route path={ROUTES.INDEX} component={WelcomeScreen} exact />
          <Redirect to={ROUTES.HOME} />
        </Switch>
      );
  }
};

export default App;
