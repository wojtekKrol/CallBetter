import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import WelcomseScreen from './screens/WelcomeScreen';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <WelcomseScreen />
      </div>
    </BrowserRouter>
  );
};

export default App;
