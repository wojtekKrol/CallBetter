import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import WelcomeScreen from './screens/WelcomeScreen';
import ROUTES from './constants/routes';
import Register from './screens/Register';
import Home from './screens/Register';

const App = () => {
  //TODO: create hook that will check if user is logged
  // const profile = useProfile() || {}

  const isUser = 'logged';

  const HomeRedirect = () => <Route path="*" component={() => <Redirect to={ROUTES.HOME} />} />;

  switch (isUser) {
    case 'logged':
      return (
        <Switch>
          <Route path={ROUTES.SIGN_UP} component={Register} />
          <Route path={ROUTES.VIDEO_CALL} component={WelcomeScreen} />
          <Route path={ROUTES.HOME} component={WelcomeScreen} />
          <Route path={ROUTES.INDEX} component={Register} exact />
          <Route path="*" component={HomeRedirect} />
        </Switch>
      );
    default:
      return (
        <Switch>
          <Route path={ROUTES.SIGN_UP} component={Register} />
          <Route path={ROUTES.LOG_IN} component={WelcomeScreen} />
          <Route path={ROUTES.HOME} component={WelcomeScreen} />
          <Route path={ROUTES.INDEX} component={Home} exact />
          <Route path="*" component={HomeRedirect} />
        </Switch>
      );
  }
};

export default App;
