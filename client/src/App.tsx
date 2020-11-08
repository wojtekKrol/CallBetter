import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import WelcomeScreen from './screens/WelcomeScreen';

const App = () => {
  //TODO: create hook that will check if user is logged
  // const profile = useProfile() || {}

  return (
    <Router>
      <div className="App">
        <WelcomeScreen />
      </div>
    </Router>
  );
};

export default App;
