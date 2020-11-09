import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import WelcomeScreen from './screens/WelcomeScreen';
import ROUTES from './constants/routes';

const App = () => {
  //TODO: create hook that will check if user is logged
  // const profile = useProfile() || {}

  const isUser = 'logged';

  const HomeRedirect = () => <Route path="*" component={() => <Redirect to={ROUTES.HOME} />} />;

  switch (isUser) {
    case 'logged':
      return (
        <Switch>
          <Route path={ROUTES.HOME} component={WelcomeScreen} />
          <Route path={ROUTES.VIDEO_CALL} component={WelcomeScreen} />
          <Route path="*" component={HomeRedirect} />
        </Switch>
      );
    default:
      return (
        <Switch>
          <Route path={ROUTES.HOME} component={WelcomeScreen} />
          <Route path={ROUTES.SIGN_UP} component={WelcomeScreen} />
          <Route path={ROUTES.LOG_IN} component={WelcomeScreen} />
          <Route path="*" component={HomeRedirect} />
        </Switch>
      );
  }
};

export default App;
