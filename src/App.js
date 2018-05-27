import React, { PureComponent } from 'react';

import AppProvider from './context/provider';
import Router from './Router';
import './App.css';

class App extends PureComponent {
  render() {
    return (
      <div className="app">
        <AppProvider>
          <Router />
        </AppProvider>
      </div>
    );
  }
}

export default App;
