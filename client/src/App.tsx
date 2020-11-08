import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import WelcomeScreen from './screens/WelcomeScreen';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <WelcomeScreen />
      </div>
    </BrowserRouter>
  );
};

export default App;
