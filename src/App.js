import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import Router from './Router';

class App extends Component {
  render() {
    StatusBar.setHidden(true, 'slide');
    return (
      <Router />
    );
  }
}
export default App;
